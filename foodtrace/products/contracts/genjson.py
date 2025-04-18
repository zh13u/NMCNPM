import json
from solcx import install_solc, compile_source

# Cài đặt trình biên dịch Solidity (chỉ cần chạy một lần)
install_solc('0.8.0')  # Hoặc phiên bản bạn đang sử dụng trong pragma của hợp đồng

# Đọc mã nguồn Solidity
with open('FoodTraceability.sol', 'r') as f:
    source = f.read()

# Biên dịch mã nguồn
compiled_sol = compile_source(source, output_values=['abi'], solc_version='0.8.0')

# Lấy thông tin hợp đồng
contract_id, contract_interface = compiled_sol.popitem()

# Lấy ABI
abi = contract_interface['abi']

# Lưu ABI vào tệp JSON
with open('FoodTraceability.json', 'w') as f:
    json.dump({'abi': abi}, f, indent=2)

print("success")