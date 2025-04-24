module.exports = {
    networkId: process.env.BLOCKCHAIN_NETWORK_ID,
    contractAddress: process.env.CONTRACT_ADDRESS,
    providerUrl: process.env.BLOCKCHAIN_PROVIDER_URL,
    privateKey: process.env.BLOCKCHAIN_PRIVATE_KEY,
    gasLimit: process.env.GAS_LIMIT || '3000000'
  };