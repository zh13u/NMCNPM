const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const solc = require('solc');

// Kết nối với Ganache
const web3 = new Web3('http://localhost:8545');

// Đọc contract source
const contractPath = path.resolve(__dirname, '../blockchain/contracts/FoodTraceability.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

// Cấu hình biên dịch
const input = {
  language: 'Solidity',
  sources: {
    'FoodTraceability.sol': {
      content: contractSource
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

async function deployContract() {
  try {
    // Biên dịch contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const contract = output.contracts['FoodTraceability.sol']['FoodTraceability'];
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    // Lấy danh sách tài khoản
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];

    console.log('Deploying contract with account:', deployer);

    // Triển khai hợp đồng
    const contractInstance = new web3.eth.Contract(abi);
    const deployTx = contractInstance.deploy({
      data: '0x' + bytecode,
      arguments: []
    });

    const gas = await deployTx.estimateGas();
    const deployedContract = await deployTx.send({
      from: deployer,
      gas: gas
    });

    console.log('Contract deployed at address:', deployedContract.options.address);

    // Lưu địa chỉ hợp đồng vào file .env
    const envPath = path.resolve(__dirname, '../.env');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Cập nhật hoặc thêm CONTRACT_ADDRESS
    if (envContent.includes('CONTRACT_ADDRESS=')) {
      envContent = envContent.replace(
        /CONTRACT_ADDRESS=.*/,
        `CONTRACT_ADDRESS=${deployedContract.options.address}`
      );
    } else {
      envContent += `\nCONTRACT_ADDRESS=${deployedContract.options.address}`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log('Contract address saved to .env file');

    // Lưu ABI vào file
    const abiPath = path.resolve(__dirname, '../src/contracts/FoodTraceability.json');
    fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));
    console.log('Contract ABI saved to file');

  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

deployContract(); 