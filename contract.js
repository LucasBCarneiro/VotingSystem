const { web3 } = require('./web3');
const CONTRACT_ABI = require('./contracts/VotingSystem/abi.json'); 
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

module.exports = contract;
