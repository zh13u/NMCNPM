# Food Traceability System Backend

## Giới thiệu
Hệ thống theo dõi nguồn gốc thực phẩm sử dụng công nghệ blockchain, được phát triển bằng Django.

## Công nghệ sử dụng
- Django 4.2
- Django REST framework
- PostgreSQL
- Redis
- Celery
- Docker

## Cài đặt

### Yêu cầu hệ thống
- Python 3.8+
- PostgreSQL 12+
- Redis 6+

### Cài đặt môi trường
```bash
# Tạo môi trường ảo
python -m venv venv

# Kích hoạt môi trường ảo
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt
```

### Cấu hình
1. Sao chép file `.env.example` thành `.env`
2. Cập nhật các biến môi trường trong file `.env`

### Chạy ứng dụng
```bash
# Chạy migrations
python manage.py migrate

# Tạo superuser
python manage.py createsuperuser

# Chạy server
python manage.py runserver
```

## API Endpoints

### Authentication
- POST `/api/auth/register/` - Đăng ký tài khoản
- POST `/api/auth/login/` - Đăng nhập
- POST `/api/auth/logout/` - Đăng xuất
- POST `/api/auth/refresh/` - Làm mới token
- POST `/api/auth/forgot-password/` - Quên mật khẩu
- POST `/api/auth/reset-password/` - Đặt lại mật khẩu

### Products
- GET `/api/products/` - Danh sách sản phẩm
- POST `/api/products/` - Tạo sản phẩm mới
- GET `/api/products/{id}/` - Chi tiết sản phẩm
- PUT `/api/products/{id}/` - Cập nhật sản phẩm
- DELETE `/api/products/{id}/` - Xóa sản phẩm

### Traceability
- GET `/api/trace/{product_id}/` - Theo dõi nguồn gốc sản phẩm
- POST `/api/trace/` - Thêm thông tin truy xuất
- GET `/api/trace/history/` - Lịch sử truy xuất

### Blockchain
- GET `/api/blockchain/blocks/` - Danh sách blocks
- GET `/api/blockchain/blocks/{hash}/` - Chi tiết block
- POST `/api/blockchain/transactions/` - Tạo transaction mới

## Cấu trúc thư mục
```
backend/
├── apps/
│   ├── accounts/         # Quản lý người dùng
│   ├── products/         # Quản lý sản phẩm
│   ├── traceability/     # Truy xuất nguồn gốc
│   └── blockchain/       # Tích hợp blockchain
├── config/               # Cấu hình project
├── utils/                # Tiện ích
└── manage.py
```

## Tích hợp Blockchain
- Sử dụng Hyperledger Fabric
- Smart contracts viết bằng Go
- Lưu trữ thông tin truy xuất trên blockchain

## Bảo mật
- JWT Authentication
- Rate limiting
- CORS
- Input validation
- SQL injection prevention

## Monitoring
- Sentry cho error tracking
- Prometheus & Grafana cho monitoring
- Logging với ELK stack

## License
MIT 