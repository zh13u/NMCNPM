import os
import json
import io
from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from web3 import Web3
import qrcode
from dotenv import load_dotenv
from datetime import datetime
import socket

# Load các biến môi trường từ file .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Thêm CORS cho phép tất cả các origin

# Kết nối với Ganache Workspace
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
if w3.is_connected():
    print("Connected to blockchain!")
else:
    raise Exception("Connection to blockchain failed!")

# Load ABI từ file FoodTraceability.json
current_dir = os.path.dirname(os.path.abspath(__file__))
abi_path = os.path.join(current_dir, 'FoodTraceability.json')

with open(abi_path, 'r') as f:
    contract_json = json.load(f)

contract_abi = contract_json['abi']

# Lấy địa chỉ contract từ biến môi trường hoặc triển khai mới nếu cần
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# Thiết lập tài khoản từ private key
try:
    account = w3.eth.account.from_key(PRIVATE_KEY)
    account_address = account.address
    print(f"Using account: {account_address}")
except Exception as e:
    print(f"Error with private key: {e}")
    # Sử dụng tài khoản đầu tiên từ Ganache nếu không lấy được từ private key
    account_address = w3.eth.accounts[0]
    print(f"Falling back to first Ganache account: {account_address}")


# Hàm triển khai contract mới
def deploy_contract():
    try:
        # Đọc bytecode từ file compiled
        bytecode_path = os.path.join(current_dir, 'FoodTraceability.json')
        with open(bytecode_path, 'r') as f:
            contract_data = json.load(f)
        bytecode = contract_data['bytecode']

        # Tạo đối tượng contract
        Contract = w3.eth.contract(abi=contract_abi, bytecode=bytecode)

        # Triển khai contract
        nonce = w3.eth.get_transaction_count(account_address)
        transaction = Contract.constructor().build_transaction({
            'from': account_address,
            'nonce': nonce,
            'gas': 4000000,
            'gasPrice': w3.to_wei('50', 'gwei')
        })

        # Ký và gửi giao dịch
        signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        contract_address = tx_receipt.contractAddress
        print(f"Contract deployed at: {contract_address}")

        # Cập nhật CONTRACT_ADDRESS trong file .env
        with open(os.path.join(current_dir, '.env'), 'r') as f:
            env_data = f.read()

        if 'CONTRACT_ADDRESS=' in env_data:
            env_data = env_data.replace(f"CONTRACT_ADDRESS={CONTRACT_ADDRESS}", f"CONTRACT_ADDRESS={contract_address}")
        else:
            env_data += f"\nCONTRACT_ADDRESS={contract_address}"

        with open(os.path.join(current_dir, '.env'), 'w') as f:
            f.write(env_data)

        return contract_address
    except Exception as e:
        print(f"Error deploying contract: {e}")
        return None


# Kiểm tra contract và triển khai nếu cần
try:
    if CONTRACT_ADDRESS:
        contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)
        # Kiểm tra contract tồn tại bằng cách gọi một hàm view
        contract.functions.getAllProductIds().call()
        print(f"Using existing contract at: {CONTRACT_ADDRESS}")
    else:
        raise Exception("No contract address configured")
except Exception as e:
    print(f"Contract not available or invalid: {e}")
    new_address = deploy_contract()
    if new_address:
        CONTRACT_ADDRESS = new_address
        contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)
    else:
        raise Exception("Failed to deploy contract")


# Tạo ID sản phẩm tiếp theo dạng SPxxxxx từ smart contract
def get_next_product_id():
    existing_ids = contract.functions.getAllProductIds().call()
    return f"SP{len(existing_ids) + 1:05d}"


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

    try:
        nonce = w3.eth.get_transaction_count(account_address)
        txn = contract.functions.addEvent(
            productId, productName, actor, location, step, qualityStatus, details
        ).build_transaction({
            'from': account_address,
            'nonce': nonce,
            'gasPrice': w3.to_wei('50', 'gwei'),
            'gas': 3000000
        })

        signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        if receipt.status != 1:
            return jsonify({'status': 'error', 'message': 'Transaction failed'}), 500

        local_ip = get_local_ip()
        url = f"http://{local_ip}:5000/product/name/{productName}"

        return jsonify({
            'status': 'success',
            'productId': productId,
            'productName': productName,
            'txHash': tx_hash.hex(),
            'productUrl': url
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# API: Lấy lịch sử sự kiện của sản phẩm theo ID
@app.route('/api/getEvents/<productId>', methods=['GET'])
def get_events_by_id(productId):
    try:
        events = contract.functions.getEvents(productId).call()

        # Định dạng dữ liệu sự kiện trước khi trả về
        event_list = []
        for event in events:
            event_list.append({
                'productName': event[0],
                'actor': event[1],
                'location': event[2],
                'step': event[3],
                'qualityStatus': event[4],
                'details': event[5],
                'timestamp': datetime.fromtimestamp(event[6]).isoformat()
            })

        return jsonify({'status': 'success', 'events': event_list})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# API mới: Lấy lịch sử sự kiện của sản phẩm theo TÊN
@app.route('/api/getEventsByName/<productName>', methods=['GET'])
def get_events_by_name(productName):
    try:
        # Lấy tất cả productId từ contract
        product_ids = contract.functions.getAllProductIds().call()

        # Tìm productId có productName trùng với tham số
        matching_events = []

        for productId in product_ids:
            events = contract.functions.getEvents(productId).call()

            # Kiểm tra xem có sự kiện nào có productName trùng khớp không
            for event in events:
                if event[0] == productName:  # Kiểm tra productName
                    matching_events.append({
                        'productId': productId,
                        'productName': event[0],
                        'actor': event[1],
                        'location': event[2],
                        'step': event[3],
                        'qualityStatus': event[4],
                        'details': event[5],
                        'timestamp': datetime.fromtimestamp(event[6]).isoformat()
                    })

        if not matching_events:
            return jsonify({'status': 'error', 'message': f'Không tìm thấy sản phẩm có tên: {productName}'}), 404

        return jsonify({'status': 'success', 'events': matching_events})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Route hiển thị chi tiết sản phẩm theo ID
@app.route('/product/<productId>')
def product_detail_by_id(productId):
    try:
        events = contract.functions.getEvents(productId).call()
        formatted_events = []

        for event in events:
            formatted_events.append({
                'productName': event[0],
                'actor': event[1],
                'location': event[2],
                'step': event[3],
                'qualityStatus': event[4],
                'details': event[5],
                'timestamp': datetime.fromtimestamp(event[6]).strftime('%Y-%m-%d %H:%M:%S')
            })

        return render_template('product.html', productId=productId, events=formatted_events)
    except Exception as e:
        return f"Lỗi: {str(e)}"


# Route mới: Hiển thị chi tiết sản phẩm theo TÊN
@app.route('/product/name/<productName>')
def product_detail_by_name(productName):
    try:
        # Lấy tất cả productId từ contract
        product_ids = contract.functions.getAllProductIds().call()

        all_events = []
        found_product_id = None

        # Tìm tất cả sự kiện của sản phẩm có tên trùng khớp
        for productId in product_ids:
            events = contract.functions.getEvents(productId).call()

            for event in events:
                if event[0] == productName:  # Nếu tên sản phẩm trùng khớp
                    all_events.append({
                        'productId': productId,
                        'productName': event[0],
                        'actor': event[1],
                        'location': event[2],
                        'step': event[3],
                        'qualityStatus': event[4],
                        'details': event[5],
                        'timestamp': datetime.fromtimestamp(event[6]).strftime('%Y-%m-%d %H:%M:%S')
                    })
                    if not found_product_id:
                        found_product_id = productId

        if not all_events:
            return f"Không tìm thấy sản phẩm có tên: {productName}"

        return render_template('product.html',
                               productName=productName,
                               productId=found_product_id,
                               events=all_events)
    except Exception as e:
        return f"Lỗi: {str(e)}"


# API: Lấy danh sách tất cả sản phẩm
@app.route('/api/getAllProducts', methods=['GET'])
def get_all_products():
    try:
        product_ids = contract.functions.getAllProductIds().call()
        products = []

        for productId in product_ids:
            events = contract.functions.getEvents(productId).call()
            if events:  # Nếu có sự kiện cho sản phẩm này
                # Lấy tên sản phẩm từ sự kiện đầu tiên
                productName = events[0][0]
                products.append({
                    'productId': productId,
                    'productName': productName
                })

        return jsonify({'status': 'success', 'products': products})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Route: Hiển thị tất cả sản phẩm
@app.route('/products')
def all_products():
    try:
        product_ids = contract.functions.getAllProductIds().call()
        products = []

        for productId in product_ids:
            events = contract.functions.getEvents(productId).call()
            if events:
                productName = events[0][0]
                latest_event = events[-1]
                products.append({
                    'productId': productId,
                    'productName': productName,
                    'latestStep': latest_event[3],
                    'latestTimestamp': datetime.fromtimestamp(latest_event[6]).strftime('%Y-%m-%d %H:%M:%S')
                })

        return render_template('products'
                               '.html', products=products)
    except Exception as e:
        return f"Lỗi: {str(e)}"


if __name__ == '__main__':
    local_ip = get_local_ip()
    print(f"Server running on http://{local_ip}:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)