const Web3 = require('web3');
const web3 = new Web3('http://106.14.187.240/ethzeus');

const version = web3.version;
console.log(version);

web3.eth
  .getAccounts()
  .then(result => {
    console.log(result);
    return web3.eth.isMining();
  })
  .then(result => {
    console.log(result);
  });
