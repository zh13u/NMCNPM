import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Contract ABI
const contractABI: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "productId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "harvestDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "expiryDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "supplierId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "supplierName",
        "type": "string"
      }
    ],
    "name": "addEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "productId",
        "type": "string"
      }
    ],
    "name": "getEvents",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "productId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "origin",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "harvestDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "expiryDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "supplierId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "supplierName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct FoodTraceability.ProductEvent[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

interface ProductEvent {
  productId: string;
  name: string;
  description: string;
  category: string;
  origin: string;
  harvestDate: string;
  expiryDate: string;
  supplierId: string;
  supplierName: string;
  timestamp: string;
}

export const addProductToBlockchain = async (productData: {
  id: string;
  name: string;
  description: string;
  category: string;
  origin: string;
  harvestDate: string;
  expiryDate: string;
  supplierId: string;
  supplierName: string;
}): Promise<{ hash: string }> => {
  try {
    if (!process.env.GANACHE_URL) {
      throw new Error('Ganache URL not configured');
    }
    if (!process.env.CONTRACT_ADDRESS) {
      throw new Error('Contract address not configured');
    }

    const web3 = new Web3(process.env.GANACHE_URL);
    const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);
    
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts available in Ganache');
    }
    const fromAddress = accounts[0];

    const tx = await contract.methods.addEvent(
      productData.id,
      productData.name,
      productData.description,
      productData.category,
      productData.origin,
      productData.harvestDate,
      productData.expiryDate,
      productData.supplierId,
      productData.supplierName
    ).send({ 
      from: fromAddress,
      gas: 3000000
    });

    if (!tx.transactionHash) {
      throw new Error('Transaction failed - no hash returned');
    }

    return { hash: tx.transactionHash };
  } catch (error) {
    console.error('Error adding product to blockchain:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to add product to blockchain');
  }
};

export const verifyProduct = async (productId: string): Promise<{
  isValid: boolean;
  productData?: ProductEvent;
}> => {
  try {
    const web3 = new Web3('http://localhost:7545');
    const contractAddress = process.env.CONTRACT_ADDRESS || '0x1b13dF7eecf2847a85C96210889C559931325E64';
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const events = await contract.methods.getEvents(productId).call();
    
    if (events.length === 0) {
      return { isValid: false };
    }

    const latestEvent = events[events.length - 1];
    return {
      isValid: true,
      productData: {
        productId: latestEvent.productId,
        name: latestEvent.name,
        description: latestEvent.description,
        category: latestEvent.category,
        origin: latestEvent.origin,
        harvestDate: latestEvent.harvestDate,
        expiryDate: latestEvent.expiryDate,
        supplierId: latestEvent.supplierId,
        supplierName: latestEvent.supplierName,
        timestamp: latestEvent.timestamp.toString()
      }
    };
  } catch (error) {
    console.error('Error verifying product:', error);
    throw error;
  }
}; 