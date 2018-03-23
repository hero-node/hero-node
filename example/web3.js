const Web3 = require('web3');
const web3 = new Web3('http://localhost:8080/ethzeus');

const version = web3.version;
console.log(version);

web3.eth.getAccounts().then(result => {
  console.log(result);
});
