import os
import json
import io
from flask import Flask, request, jsonify, render_template, send_file
from web3 import Web3
from hexbytes import HexBytes
import qrcode
from dotenv import load_dotenv
from datetime import datetime

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

# Lấy ABI từ file và "unbox" nếu cần (nếu ABI là nested list)
contract_abi = contract_json['abi']
if isinstance(contract_abi, list) and len(contract_abi) > 0 and isinstance(contract_abi[0], list):
    contract_abi = contract_abi[0]

# Tự động lấy contract address và private key từ biến môi trường
contract_address = w3.to_checksum_address(os.getenv("CONTRACT_ADDRESS"))
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# Tạo instance của smart contract
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Sử dụng tài khoản đầu tiên từ Ganache (hoặc thay bằng tài khoản tương ứng)
account = w3.eth.accounts[0]

# Filter chuyển đổi timestamp sang chuỗi
@app.template_filter('timestamp_to_string')
def timestamp_to_string_filter(ts):
    return datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

#########################
# Hàm helper chuyển đổi HexBytes
#########################
def convert_hexbytes(obj):
    """Chuyển đổi tất cả HexBytes trong dictionary/list thành chuỗi hex."""
    if isinstance(obj, dict):
        return {k: convert_hexbytes(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_hexbytes(v) for v in obj]
    elif isinstance(obj, HexBytes):
        return obj.hex()  # Chuyển HexBytes thành chuỗi hex
    else:
        return obj

#########################
# Các API Endpoints   ##
#########################

@app.route('/')
def index():
    return render_template('index.html')

# API: Thêm sự kiện vào blockchain
@app.route('/api/addEvent', methods=['POST'])
def add_event():
    data = request.json
    productId = data.get('productId')
    productName = data.get('productName')
    actor = data.get('actor')
    location = data.get('location')
    step = data.get('step')
    qualityStatus = data.get('qualityStatus')
    details = data.get('details', '')
    
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
        
        # Chuyển đổi HexBytes trong tx_receipt
        tx_receipt_dict = convert_hexbytes(dict(tx_receipt))
        return jsonify({'status': 'success', 'tx_receipt': tx_receipt_dict})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# API: Lấy lịch sử sự kiện theo productId
@app.route('/api/getEvents/<productId>', methods=['GET'])
def get_events(productId):
    try:
        events = contract.functions.getEvents(productId).call()
        # Chuyển đổi HexBytes trong events (nếu có)
        events = convert_hexbytes(events)
        return jsonify({'status': 'success', 'events': events})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# API: Tạo QR Code cho sản phẩm
@app.route('/api/generateQR/<productId>', methods=['GET'])
def generate_qr(productId):
    try:
        url = f"http://localhost:5000/product/{productId}"
        qr = qrcode.make(url)
        img_io = io.BytesIO()
        qr.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

# Route hiển thị thông tin sản phẩm
@app.route('/product/<productId>')
def product_detail(productId):
    try:
        events = contract.functions.getEvents(productId).call()
        return render_template('product.html', productId=productId, events=events)
    except Exception as e:
        return f"Lỗi: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)