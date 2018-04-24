/**
 * Created by Kael on 2018/3/24.
 */

import Web3 from 'web3'
import Config from "../config";
import ZeroClientProvider from 'web3-provider-engine/ProviderEngine/es5/zero'

let web3;
if (Web3.givenProvider) {
    web3 = new Web3(Web3.givenProvider);
    // // console.log(web3.utils.toHex('20000000000'));
    // // console.log(web3.utils.toUtf8('20000000000'));
    // const txObject=JSON.parse('{"from":"0x06b544e1a3913d9f735954fd2f89137c16e02273","to":"0xd145940b50407e62021feb43b3d6154a5b6f25d5","value":"0x2386f26fc10000","data":"0x721ce10100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000002386f26fc10000","gas":"0x16e360","gasPrice":"0x3b9aca00","nonce":"0xc0"}')
    // console.log(txObject)
    // const newParams={}
    // for(const [key,value] of Object.entries(txObject))
    // {
    //     // if(key==='from'||key==='to'){
    //     //     newParams[key]=value;
    //     // }
    //     if(key==='gas'||key==='gasPrice'){
    //         // console.log(key)
    //         newParams[key]=Web3.utils.hexToNumber(value);
    //         // console.log(Web3.utils.isHex(value))
    //         // console.log(Web3.utils.hexToNumber(value));
    //         // console.log(Web3.utils.hexToNumber(value));
    //     }
    //     if(key==='data'){
    //         console.log(Web3.utils.hexToBytes(value))
    //         newParams[key]=Web3.utils.hexToBytes(value);
    //
    //         // console.log(Web3.utils.hexToBytes(value));
    //         // console.log(Web3.utils.hexToString(value));
    //         // console.log(Web3.utils.hexToUtf8(value))
    //     }
    //     newParams[key]=value;
    //
    // }

}
else if (Config.isWorldCupApp()) {
    const {web3Js} = window;
    if (!web3Js) {
        alert('未发现web3Js对象');
    }
    else {
        const providerEngine = ZeroClientProvider({
            getAccounts: function (cb) {
                // console.log(`getAccounts=`,cb)
                // const {address} = account;
                // console.log();
                const account = web3Js.getAccount();
                console.log(account);
                cb(null, [account])
            },
            signTransaction: function (txParams, cb) {
                // const newParams={}
                // for(const [key,value] of Object.entries(txParams))
                // {
                //     if(key==='gas'||key==='gasPrice'){
                //         console.log(key,`${Web3.utils.hexToNumber(value)}`);
                //         newParams[key]=`${Web3.utils.hexToNumber(value)}`;
                //     }
                //     if(key==='data'){
                //         newParams[key]=`${Web3.utils.hexToBytes(value)}`;
                //     }
                //     newParams[key]=value;
                //
                // }
                //
                // for(const [key,value] of Object.entries(newParams))
                // {
                //     console.log(key,value)
                // }
                // console.log(JSON.stringify(newParams))
                // alert(JSON.stringify(txParams))
                // console.log(newParams.gas);
                // web3.eth.accounts.signTransaction(txParams, privateKey ,cb);
                console.log(`txParams`,JSON.stringify(txParams));
                const rawTx = web3Js.signTransaction(JSON.stringify(txParams));
                console.log(`rawTx`,rawTx)
                cb(null, rawTx);
            }
            // supports http and websockets
            // but defaults to infura's mainnet rest api
            // rpcUrl: 'https://mainnet.infura.io',
            // rpcUrl: 'http://localhost:8545',
            // rpcUrl: 'wss://mainnet.infura.io/ws',
            // rpcUrl: 'https://api.infura.io',
        });
        web3=new Web3(providerEngine);
    }
//
// // use the provider to instantiate Ethjs, Web3, etc
// // const eth = new Ethjs(providerEngine)
//
// // log new blocks
// //     providerEngine.on('block', function (block) {
// //         const blockNumber = Number.parseInt(block.number.toString('hex'), 16);
// //         const blockHash = `0x${block.hash.toString('hex')}`;
// //         console.log(`block: #${blockNumber} ${blockHash}`)
// //     });
}
else {
    alert('请在web3环境下使用');
}

// const from ='0x36ffE585A739d749b17CF0D29e1F9A9daf6207C6'
// const challenge = [{
//     type: 'string',
//     name: 'challenge',
//     value: 'hello'
// }];
// const params = [challenge, from];
// web3.currentProvider.send({
//     jsonrpc:'2.0',
//     method: 'eth_signTypedData',
//     params,
//     id:1,
// },(result,value)=>{
//     console.log(result,value)
// })

// web3.eth.sign(web3.utils.toHex("Hello world"), from)
//     .then(console.log);

// create engine
// const privateKey='0x80e6cd2c7546ce1c53d1e31a634aa778f167cf6dce286ce09f2f69ba9910c422';
// const account = web3.eth.accounts.privateKeyToAccount(privateKey)
// console.log(account)

export default web3;
