import os
import json
from web3 import Web3
from solcx import compile_standard, install_solc
from dotenv import load_dotenv

# Kết nối Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
account = w3.eth.accounts[0]
private_key = os.getenv("PRIVATE_KEY") or input("Nhập PRIVATE_KEY của bạn (từ Ganache): ")

# Load và compile .sol
install_solc("0.8.0")
with open(r"D:\foodtrace\sapxong\blockchain\contracts\FoodTraceability.sol", "r") as file:
# with open("contracts/FoodTraceability.sol", "r") as file: #uncommand neu may khong nhan duoc duong dan
    contract_source = file.read()

compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "FoodTraceability.sol": {
            "content": contract_source
        }
    },
    "settings": {
        "outputSelection": {
            "*": {
                "*": ["abi", "metadata", "evm.bytecode"]
            }
        }
    }
}, solc_version="0.8.0")

# Lấy ABI và bytecode
contract_interface = compiled_sol['contracts']['FoodTraceability.sol']['FoodTraceability']
contract_abi = contract_interface['abi']
bytecode = contract_interface['evm']['bytecode']['object']

# Deploy contract
contract = w3.eth.contract(abi=contract_abi, bytecode=bytecode)
nonce = w3.eth.get_transaction_count(account)
tx = contract.constructor().build_transaction({
    'from': account,
    'nonce': nonce,
    'gas': 3000000,
    'gasPrice': w3.to_wei('20', 'gwei')
})

signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# Save ABI + contract address
with open("FoodTraceability.json", "w") as f:
    json.dump({
        "abi": contract_abi,
        "address": tx_receipt.contractAddress
    }, f, indent=2)

# Save .env
with open(".env", "w") as f:
    f.write(f"PRIVATE_KEY={private_key}\n")
    f.write(f"CONTRACT_ADDRESS={tx_receipt.contractAddress}\n")

print(f"Deployed! Contract Address: {tx_receipt.contractAddress}")
