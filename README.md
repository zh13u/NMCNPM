# Food Traceability System - Hệ thống truy xuất nguồn gốc thực phẩm

## Giới thiệu

Hệ thống truy xuất nguồn gốc thực phẩm sử dụng công nghệ Blockchain để theo dõi và quản lý thông tin về nguồn gốc, quy trình sản xuất và vận chuyển của các sản phẩm thực phẩm. Hệ thống giúp tăng tính minh bạch và đáng tin cậy trong chuỗi cung ứng thực phẩm.

## Công nghệ sử dụng

### Backend (Blockchain)

- **Solidity**: Ngôn ngữ lập trình smart contract
- **Web3.py**: Thư viện Python để tương tác với Ethereum
- **Flask**: Framework web Python
- **Ganache**: Mạng Ethereum testnet
- **Python-dotenv**: Quản lý biến môi trường

### Frontend

- **React.js**: Framework JavaScript
- **TypeScript**: Ngôn ngữ lập trình
- **Material-UI**: Thư viện UI components
- **Web3.js**: Thư viện JavaScript để tương tác với Ethereum
- **Axios**: Thư viện HTTP client

## Chức năng chính

### 1. Quản lý sản phẩm

- Thêm sản phẩm mới vào hệ thống
- Theo dõi thông tin chi tiết của sản phẩm
- Xem danh sách tất cả sản phẩm


### 2. Truy xuất thông tin

- Quét mã QR để xem thông tin sản phẩm
- Tìm kiếm sản phẩm theo ID hoặc tên
- Xem chi tiết quy trình sản xuất và vận chuyển

### 3. Bảo mật và xác thực

- Xác thực người dùng và phân quyền
- Bảo mật thông tin trên blockchain
- Chống giả mạo thông tin sản phẩm

## Cấu trúc dự án

```
├── FoodTraceability.json                  # Dữ liệu/cấu hình chung cho hệ thống truy xuất nguồn gốc
├── backend                                # Server xử lý API và kết nối blockchain
│   ├── controllers                        # Xử lý logic cho các API
│   ├── models                             # Định nghĩa mô hình dữ liệu
│   ├── routes                             # Khai báo các endpoint API
│   ├── server.js                          # Điểm khởi động backend server
│   ├── package.json                       # Quản lý thư viện và script backend
├── blockchain                             # Xử lý tương tác với blockchain
│   ├── app.py                             # Giao tiếp blockchain bằng Python
│   ├── contracts                          # Smart contract (Solidity)
│   ├── deploy.py                          # Script deploy smart contract
│   ├── interact.js                        # Tương tác contract bằng JS
├── frontend                               # Giao diện người dùng (React + TS)
│   ├── public
│   │   └── index.html                     # Template HTML chính
│   ├── src
│   │   ├── App.tsx                        # Thành phần chính React app
│   │   ├── components                     # Các UI component tái sử dụng
│   │   ├── pages                          # Các trang như Home, Detail,...
│   │   ├── services                       # Gọi API backend
│   │   └── index.tsx                      # Điểm khởi động React app
│   ├── package.json                       # Quản lý thư viện và script frontend

```

## Cài đặt và chạy

### Yêu cầu hệ thống

- **Node.js** >= **14.x**
- **Python** >= **3.8**
- **Ganache**
- **npm** hoặc **yarn**
### Bước 1: Cài đặt chạy Docker để khởi tạo database

1. Tải **Docker Desktop**
2. Pull docker bản mới nhất 
```shell
docker pull mongo:latest
```

3. Khởi chạy docker
```shell
docker run -d -p 27017:27017 --name foodtrace mongo:latest
```

4. Dùng `MongoDB Compass` để thao tác

### Bước 2: Cài đặt và chạy Ganache cho server blockchain

1. Tải và cài đặt **Ganache**
2. Khởi động **Ganache**
3. Sao chép `private_key` từ **Ganache** 
4. Chạy file `blockchain/deploy.py` và dán `private_key`
5. Hoàn thành việc chạy server -> chạy `blockchain/app.py`

### Bước 3: Cài đặt và khởi chạy backend

```shell
cd blockchain
pip install -r requirements.txt
npm install
npm start
```

### Bước 4: Cài đặt Frontend

```bash=
cd frontend
npm install
npm start
```

## Cấu hình môi trường

### Backend (.env)

```
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=your_contract_address
```

### Frontend (config.ts)

```typescript
export const API_URL = "http://localhost:3001";
export const BLOCKCHAIN_API = "http://your_ip:5000";
```

## Lưu ý

- Đảm bảo Ganache đang chạy trước khi khởi động backend
- Kiểm tra kết nối mạng giữa frontend và backend
- Lưu trữ private key an toàn và không chia sẻ

