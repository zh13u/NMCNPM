import re
import os
import sys

def update_frontend_config(ip_address):
    # Lấy đường dẫn thư mục hiện tại
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Xây dựng đường dẫn tuyệt đối đến file config.ts
    config_path = os.path.join(current_dir, '..', 'frontend', 'src', 'config.ts')
    
    # Kiểm tra xem file có tồn tại không
    if not os.path.exists(config_path):
        print(f"Lỗi: Không tìm thấy file config.ts tại: {config_path}")
        print("Vui lòng đảm bảo cấu trúc thư mục đúng:")
        print("sapxong/")
        print("├── blockchain/")
        print("│   └── update_config.py")
        print("└── frontend/")
        print("    └── src/")
        print("        └── config.ts")
        return False
    
    try:
        # Đọc nội dung file
        with open(config_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Thay thế IP trong BLOCKCHAIN_API
        new_content = re.sub(
            r"export const BLOCKCHAIN_API = 'http://[0-9.]+:5000';",
            f"export const BLOCKCHAIN_API = 'http://{ip_address}:5000';",
            content
        )
        
        # Ghi lại nội dung mới
        with open(config_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        
        print(f"Đã cập nhật BLOCKCHAIN_API thành http://{ip_address}:5000")
        return True
    except Exception as e:
        print(f"Lỗi khi cập nhật file config.ts: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python update_config.py <ip_address>")
        sys.exit(1)
    
    ip_address = sys.argv[1]
    success = update_frontend_config(ip_address)
    sys.exit(0 if success else 1) 