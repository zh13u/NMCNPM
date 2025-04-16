import os
import json
import io
from flask import Flask, request, jsonify, render_template, send_file
from web3 import Web3
from hexbytes import HexBytes
import qrcode
from dotenv import load_dotenv
from datetime import datetime
import socket
from web3.datastructures import AttributeDict

# Load các biến môi trường từ file .env
load_dotenv()

app = Flask(__name__)

# Kết nối với Ganache hoặc mạng test khác
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
if w3.is_connected():
    print("Connected to blockchain!")
else:
    print("Connection failed!")

# Load ABI và địa chỉ contract từ file FoodTraceability.json
current_dir = os.path.dirname(os.path.abspath(__file__))
abi_path = os.path.join(current_dir, 'FoodTraceability.json')

with open(abi_path, 'r') as f:
    contract_json = json.load(f)

contract_abi = contract_json['abi']
contract_address = w3.to_checksum_address(os.getenv("CONTRACT_ADDRESS"))
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

contract = w3.eth.contract(address=contract_address, abi=contract_abi)
account = w3.eth.accounts[0]

# Tạo id sản phẩm tiếp theo dạng SPxxxxx
def get_next_product_id():
    existing_ids = contract.functions.getAllProductIds().call()
    return f"SP{len(existing_ids)+1:05d}"

@app.template_filter('timestamp_to_string')
def timestamp_to_string_filter(ts):
    return datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

# Chuyển đổi HexBytes và AttributeDict sang kiểu JSON được
def convert_hexbytes(obj):
    if isinstance(obj, dict):
        return {k: convert_hexbytes(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_hexbytes(v) for v in obj]
    elif isinstance(obj, HexBytes):
        return obj.hex()
    elif isinstance(obj, AttributeDict):
        return {k: convert_hexbytes(v) for k, v in obj.items()}
    else:
        return obj

# Lấy IP local
def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

@app.route('/')
def index():
    return render_template('index.html')

# API: Thêm sự kiện vào blockchain
@app.route('/api/addEvent', methods=['POST'])
def add_event():
    data = request.json

    productName = data.get('productName')
    actor = data.get('actor')
    location = data.get('location')
    step = data.get('step')
    qualityStatus = data.get('qualityStatus')
    details = data.get('details', '')

    # Tạo productId tự động
    productId = get_next_product_id()

    # Kiểm tra productId đã tồn tại chưa
    existing_events = contract.functions.getEvents(productId).call()
    if existing_events:
        return jsonify({'status': 'error',
                        'error': 'ID sản phẩm này đã tồn tại. Vui lòng thử lại.'}), 400

    nonce = w3.eth.get_transaction_count(account)
    txn = contract.functions.addEvent(
        productId, productName, actor, location, step, qualityStatus, details
    ).build_transaction({
        'from': account,
        'nonce': nonce,
        'gasPrice': w3.to_wei('20', 'gwei'),
        'gas': 3000000
    })

    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    try:
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        #Ghi data vao file log
        product_data = {
            'productId': productId,
            'productName': productName,
            'actor': actor,
            'location': location,
            'step': step,
            'qualityStatus': qualityStatus,
            'details': details,
            'timestamp': int(datetime.now().timestamp())
        }

        log_file_path = os.path.join(current_dir, 'product_log.json')
        try:
            if os.path.exists(log_file_path):
                with open(log_file_path, 'r', encoding='utf-8') as f:
                    existing_logs = json.load(f)
            else:
                existing_logs = []

            existing_logs.append(product_data)
            with open(log_file_path, 'w', encoding='utf-8') as f:
                json.dump(existing_logs, f, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"Lỗi ghi log: {e}")

        #Tạo mã QR
        local_ip = get_local_ip()
        url = f"http://{local_ip}:5000/product/{productId}"
        qr = qrcode.make(url)
        img_io = io.BytesIO()
        qr.save(img_io, 'PNG')
        img_io.seek(0)
        qr_data = img_io.getvalue()  # trả ảnh dạng byte

        tx_receipt_dict = convert_hexbytes(dict(tx_receipt))
        return jsonify({
            'status': 'success',
            'productId': productId,
            'tx_receipt': tx_receipt_dict,
            'qr_image': qr_data.hex()
        })
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# API: Lấy lịch sử sự kiện theo productId
@app.route('/api/getEvents/<productId>', methods=['GET'])
def get_events(productId):
    try:
        events = contract.functions.getEvents(productId).call()
        event_list = []
        for event in events:
            event_dict = {
                'productId': event[0],
                'productName': event[1],
                'actor': event[2],
                'location': event[3],
                'step': event[4],
                'qualityStatus': event[5],
                'details': event[6],
                'timestamp': event[7]
            }
            event_list.append(event_dict)
        return jsonify({'status': 'success', 'events': event_list})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# API: Tìm sản phẩm theo tên
@app.route('/api/searchProduct', methods=['GET'])
def search_product():
    try:
        product_name = request.args.get('name', '').strip().lower()
        matched = []

        all_ids = contract.functions.getAllProductIds().call()
        for pid in all_ids:
            events = contract.functions.getEvents(pid).call()
            if events and events[0][1].lower() == product_name:
                event = events[0]
                matched.append({
                    'productId': event[0],
                    'productName': event[1],
                    'actor': event[2],
                    'location': event[3],
                    'step': event[4],
                    'qualityStatus': event[5],
                    'details': event[6],
                    'timestamp': event[7]
                })

        if matched:
            return jsonify({'status': 'success', 'results': matched})
        else:
            return jsonify({'status': 'not_found', 'message': 'Không tìm thấy sản phẩm'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# API: Tạo QR Code cho sản phẩm
@app.route('/api/generateQR/<productId>', methods=['GET'])
def generate_qr(productId):
    try:
        local_ip = get_local_ip()
        url = f"http://{local_ip}:5000/product/{productId}"
        qr = qrcode.make(url)
        img_io = io.BytesIO()
        qr.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# Route: Hiển thị trang chi tiết sản phẩm
@app.route('/product/<productId>')
def product_detail(productId):
    try:
        events = contract.functions.getEvents(productId).call()
        return render_template('product.html', productId=productId, events=events)
    except Exception as e:
        return f"{str(e)}"

def restore_from_log():
    log_file_path = os.path.join(current_dir, 'product_log.json')
    if not os.path.exists(log_file_path):
        print("Coundn't find log file")
        return

    try:
        with open(log_file_path, 'r', encoding='utf-8') as f:
            product_logs = json.load(f)
    except Exception as e:
        print(f"read log error: {e}")
        return

    for entry in product_logs:
        productId = entry['productId']
        existing_events = contract.functions.getEvents(productId).call()
        if existing_events:
            continue  # đã tồn tại trên blockchain

        print(f"restore: {productId} - {entry['productName']}")
        try:
            nonce = w3.eth.get_transaction_count(account)
            txn = contract.functions.addEvent(
                productId,
                entry['productName'],
                entry['actor'],
                entry['location'],
                entry['step'],
                entry['qualityStatus'],
                entry['details']
            ).build_transaction({
                'from': account,
                'nonce': nonce,
                'gasPrice': w3.to_wei('20', 'gwei'),
                'gas': 3000000
            })
            signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
            tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
            w3.eth.wait_for_transaction_receipt(tx_hash)
        except Exception as e:
            print(f"restore product {productId}: {e}")


if __name__ == '__main__':
    restore_from_log()
    local_ip = get_local_ip()
    print(f"Server running on: http://{local_ip}:5000")
    app.run(host='0.0.0.0', port=5000)
