/**
 * Created by Kael on 2018/3/24.
 */

import Web3 from 'web3'
// import ZeroClientProvider from './web3Provider'


let web3;
if (Web3.givenProvider) {
    web3 = new Web3(Web3.givenProvider);
} else {
    alert('请在web3环境下使用');
}
//
// // create engine
// const providerEngine = ZeroClientProvider({
//     getAccounts:function (cb) {
//         console.log(`getAccounts=`,cb)
//         cb(null,[1111])
//     },
//     getBalance:function (cb) {
//         console.log(`getBalance=`,cb)
//         cb(null,[1111])
//     },
//     // supports http and websockets
//     // but defaults to infura's mainnet rest api
//     // rpcUrl: 'https://mainnet.infura.io',
//     // rpcUrl: 'http://localhost:8545',
//     // rpcUrl: 'wss://mainnet.infura.io/ws',
//     // rpcUrl: 'ws://localhost:8545/ws',
// });
// web3 = new Web3(providerEngine);
// // use the provider to instantiate Ethjs, Web3, etc
// // const eth = new Ethjs(providerEngine)
//
// // log new blocks
// providerEngine.on('block', function(block) {
//     const blockNumber = Number.parseInt(block.number.toString('hex'), 16);
//     const blockHash = `0x${block.hash.toString('hex')}`;
//     console.log(`block: #${blockNumber} ${blockHash}`)
// });



module.exports = {
    web3: web3,
};
