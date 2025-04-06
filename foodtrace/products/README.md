# 🧾 Food Traceability DApp (Blockchain + Flask)

Hệ thống truy xuất nguồn gốc thực phẩm sử dụng **Smart Contract trên Ethereum (Ganache)** kết hợp với **Flask (Python)** và **QR Code** để theo dõi thông tin sản phẩm xuyên suốt chuỗi cung ứng.

## 🚀 Công nghệ sử dụng

- 🔗 Ethereum Blockchain (Ganache)
- 🔐 Smart Contract (Solidity)
- 🐍 Python (Flask, Web3.py)
- 🧠 JSON ABI (Contract Interface)
- 📷 QR Code (Python `qrcode`)
- 🌐 HTML + Jinja2 (template engine)

## ⚙️ Hướng dẫn cài đặt & sử dụng

### ✅ Bước 1: Cài đặt công cụ cần thiết

1. [Tải Python 3.x](https://www.python.org/downloads/)
2. [Tải Ganache](https://trufflesuite.com/ganache/) và cài đặt
3. Truy cập [Remix IDE](https://remix.ethereum.org/) để compile + deploy Smart Contract

### ✅ Bước 2: Clone dự án

### ✅ Bước 3: Cài đặt thư viện Python

pip install -r requirements.txt

### ✅ Bước 4: Deploy Smart Contract

Mở Ganache, tạo Workspace mới.
Truy cập Remix IDE
Mở file contracts/FoodTraceability.sol
Tại tab Solidity Compiler, chọn phiên bản 0.8.x, nhấn Compile
Vào tab Deploy & Run Transactions:
Environment: chọn Web3 Provider
Nhập URL RPC của Ganache: http://127.0.0.1:7545
Nhấn Deploy
Sau khi deploy:
Copy Contract Address
Mở tab ABI, copy toàn bộ JSON ABI

### ✅ Bước 5: Tạo file FoodTraceability.json

Tạo file FoodTraceability.json ở cùng thư mục với app.py và dán:

{
  "abi": [ ...dán ABI tại đây... ],
}

### ✅ Bước 6: Tạo file .env

Tạo file .env trong thư mục gốc và thêm:

PRIVATE_KEY=0x<PRIVATE_KEY_TỪ_GANACHE>
CONTRACT_ADDRESS=0x<ĐỊA_CHỈ_CONTRACT>

📌 Lưu ý: Trong Ganache, nhấn vào icon 🔑 để sao chép private key tài khoản deploy contract.

### ✅ Bước 7: Chạy ứng dụng Flask

python app.py
Sau khi chạy thành công, mở trình duyệt và truy cập:
http://localhost:5000
http://127.0.0.1:5000

## 🔌 API Hỗ Trợ
Method	Endpoint	Mô tả chức năng
POST	/api/addEvent	Thêm sự kiện truy xuất sản phẩm
GET	/api/getEvents/<productId>	Truy xuất toàn bộ lịch sử sản phẩm
GET	/api/generateQR/<productId>	Tạo mã QR dẫn đến thông tin sản phẩm
GET	/product/<productId>	Giao diện chi tiết sản phẩm

## ⚠️ Ghi chú quan trọng
🛑 Ganache phải được mở trước khi chạy Flask
✅ Dự án sẽ tự động gọi deploy.py nếu chưa có contract → không cần deploy thủ công nhiều lần
❌ Flask server này chỉ nên dùng để phát triển hoặc học tập, không khuyến khích đưa lên production
