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
import subprocess

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
abi_path = os.path.join(current_dir, 'contracts', 'FoodTraceability.json')

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
        contract.functions.getProductCount().call()
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


# Cập nhật IP trong file config.ts của frontend
def update_frontend_config(ip_address):
    try:
        # Đường dẫn đến script update_config.py
        update_script = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'update_config.py')
        # Chạy script với IP hiện tại
        subprocess.run(['python', update_script, ip_address], check=True)
        print(f"Đã cập nhật IP trong file config.ts thành {ip_address}")
    except Exception as e:
        print(f"Lỗi khi cập nhật file config.ts: {e}")


@app.route('/')
def index():
    return render_template('index.html')


# API: Thêm sản phẩm mới
@app.route('/api/addProduct', methods=['POST'])
def add_product():
    data = request.json

    product_id = data.get('id')
    name = data.get('name')
    origin = data.get('origin')

    if not all([product_id, name, origin]):
        return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

    try:
        nonce = w3.eth.get_transaction_count(account_address)
        txn = contract.functions.addProduct(
            product_id, name, origin
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

        return jsonify({
            'status': 'success',
            'productId': product_id,
            'name': name,
            'txHash': tx_hash.hex()
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# API: Thêm bước mới cho sản phẩm
@app.route('/api/addStep', methods=['POST'])
def add_step():
    data = request.json

    product_id = data.get('id')
    actor = data.get('actor')
    location = data.get('location')
    step = data.get('step')
    quality_status = data.get('qualityStatus')
    details = data.get('details')

    if not all([product_id, actor, location, step, quality_status]):
        return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

    try:
        nonce = w3.eth.get_transaction_count(account_address)
        txn = contract.functions.addStep(
            product_id, actor, location, step, quality_status, details or ''
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

        return jsonify({
            'status': 'success',
            'productId': product_id,
            'step': step,
            'txHash': tx_hash.hex()
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# API: Lấy thông tin sản phẩm
@app.route('/api/getProduct/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = contract.functions.getProduct(product_id).call()
        return jsonify({
            'status': 'success',
            'product': {
                'name': product[0],
                'origin': product[1],
                'createdAt': datetime.fromtimestamp(product[2]).isoformat(),
                'createdBy': product[3],
                'exists': product[4]
            }
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# API: Lấy lịch sử sản phẩm
@app.route('/api/getProductHistory/<product_id>', methods=['GET'])
def get_product_history(product_id):
    try:
        history = contract.functions.getProductHistory(product_id).call()
        formatted_history = []
        
        for step in history:
            formatted_history.append({
                'actor': step[0],
                'location': step[1],
                'step': step[2],
                'qualityStatus': step[3],
                'details': step[4],
                'timestamp': datetime.fromtimestamp(step[5]).isoformat()
            })

        return jsonify({
            'status': 'success',
            'history': formatted_history
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# API: Lấy ID sản phẩm tiếp theo
@app.route('/api/getNextProductId', methods=['GET'])
def get_next_product_id():
    try:
        # Lấy số lượng sản phẩm hiện tại
        count = contract.functions.getProductCount().call()
        # Tạo ID mới theo định dạng SPxxxxx
        next_id = f"SP{count + 1:05d}"
        return jsonify({
            'status': 'success',
            'productId': next_id
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Route hiển thị chi tiết sản phẩm
@app.route('/product/<product_id>')
def product_detail(product_id):
    try:
        product = contract.functions.getProduct(product_id).call()
        history = contract.functions.getProductHistory(product_id).call()
        
        formatted_history = []
        for step in history:
            formatted_history.append({
                'actor': step[0],
                'location': step[1],
                'step': step[2],
                'qualityStatus': step[3],
                'details': step[4],
                'timestamp': datetime.fromtimestamp(step[5]).strftime('%Y-%m-%d %H:%M:%S')
            })

        return render_template('product.html', 
            productId=product_id,
            product={
                'name': product[0],
                'origin': product[1],
                'createdAt': datetime.fromtimestamp(product[2]).strftime('%Y-%m-%d %H:%M:%S'),
                'createdBy': product[3]
            },
            history=formatted_history
        )
    except Exception as e:
        return f"Lỗi: {str(e)}"


# Hàm tạo QR code
def generate_qr_code(product_id):
    # Tạo URL để truy cập thông tin sản phẩm
    base_url = f"http://{get_local_ip()}:5000"
    product_url = f"{base_url}/product/{product_id}"
    
    # Tạo QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(product_url)
    qr.make(fit=True)
    
    # Tạo ảnh QR code
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Chuyển ảnh thành bytes
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return img_byte_arr


# API: Tạo và trả về QR code
@app.route('/api/getQRCode/<product_id>', methods=['GET'])
def get_qr_code(product_id):
    try:
        # Kiểm tra sản phẩm tồn tại
        product = contract.functions.getProduct(product_id).call()
        if not product[4]:  # product.exists
            return jsonify({'status': 'error', 'message': 'Product not found'}), 404
        
        # Tạo QR code
        qr_code = generate_qr_code(product_id)
        
        # Trả về ảnh QR code
        return send_file(
            qr_code,
            mimetype='image/png',
            as_attachment=False
        )
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    local_ip = get_local_ip()
    update_frontend_config(local_ip)
    print(f"Server running on http://{local_ip}:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)