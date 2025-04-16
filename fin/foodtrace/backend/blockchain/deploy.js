const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const config = require('../config/blockchain');

// Đọc ABI từ file
const contractPath = path.join(__dirname, 'contracts', 'FoodTracking.json');
const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

async function deployContract() {
  try {
    // Khởi tạo Web3
    const web3 = new Web3(config.providerUrl);

    // Tạo tài khoản từ private key
    const account = web3.eth.accounts.privateKeyToAccount('0x' + config.privateKey);
    web3.eth.accounts.wallet.add(account);
    
    console.log(`Deploying from account: ${account.address}`);

    // Tạo contract instance
    const contract = new web3.eth.Contract(abi);
    
    // Triển khai contract
    const deployTx = contract.deploy({
      data: bytecode,
      arguments: []
    });

    // Ước tính gas
    const gas = await deployTx.estimateGas();
    
    // Gửi transaction
    const deployedContract = await deployTx.send({
      from: account.address,
      gas
    });

    console.log(`Contract deployed at: ${deployedContract.options.address}`);
    
    // Lưu địa chỉ contract vào .env
    fs.appendFileSync('.env', `\nCONTRACT_ADDRESS=${deployedContract.options.address}`);
    
    return deployedContract.options.address;
  } catch (error) {
    console.error('Error deploying contract:', error);
    throw error;
  }
}

// Thực thi nếu gọi trực tiếp
if (require.main === module) {
  deployContract()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = deployContract;