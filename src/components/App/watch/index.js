var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

export const watchBalance=()=> {
    var coinbase = web3.eth.coinbase;

    var originalBalance = web3.eth.getBalance(coinbase).toNumber();
    console.log(originalBalance);

    return
    document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
    document.getElementById('original').innerText = ' original balance: ' + originalBalance + '    watching...';

    web3.eth.filter('latest').watch(function() {
        var currentBalance = web3.eth.getBalance(coinbase).toNumber();
        document.getElementById("current").innerText = 'current: ' + currentBalance;
        document.getElementById("diff").innerText = 'diff:    ' + (currentBalance - originalBalance);
    });
}

const abi = JSON.parse(`[
    {
        "constant": true,
        "inputs": [],
        "name": "theWinner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "wrestler2",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "wrestler1Played",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "wrestler1",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "gameFinished",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "wrestler2Played",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "wrestler1",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "wrestler2",
                "type": "address"
            }
        ],
        "name": "WrestlingStartsEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "wrestler1Deposit",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "wrestler2Deposit",
                "type": "uint256"
            }
        ],
        "name": "EndOfRoundEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "gains",
                "type": "uint256"
            }
        ],
        "name": "EndOfWrestlingEvent",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "registerAsAnOpponent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "wrestle",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]`);
