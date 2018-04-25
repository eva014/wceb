import web3 from "../web3/web3";
import {gameAbi, gameworldAbi} from "../web3/abi";
import {localStorageReadOneData, } from "../storage/LocalStorage";
import {createMatch, createMatchBetItem} from "./mockdata";

export const testOwnerAccountIndex = 0;
export const testPlayerAccountIndex = 0;
export const testGameWorldContractAddress = '0xd36c2cee95bbbe3fed2085240b541662e601e434';


export const getDevDefaultSetting = () => {
    return web3.eth.getAccounts().then(accounts => {
        const owner = accounts[testOwnerAccountIndex];
        return {from: owner, gas: 1500000, gasPrice: '1'};
    })
};

export const getDevPlayerDefaultSetting = () => {
    return web3.eth.getAccounts().then(accounts => {
        const palyer = accounts[testPlayerAccountIndex];
        return {from: palyer, gas: 1500000, gasPrice: '1'};
    })
};

export const gameWorldContract = () => {
    return new web3.eth.Contract(gameworldAbi, testGameWorldContractAddress);
};


export const doPlayerBet = async (address, optionIndex, amount) => {
    const gameContract = new web3.eth.Contract(gameAbi, address);
    const defaultPlayerSetting = await getDevPlayerDefaultSetting();
    // console.log(address,optionIndex,amount)
    const amountStr = web3.utils.toWei(amount, 'ether').toString()
    // console.log(web3.utils.toWei(amount,'ether').toString())
    // console.log(defaultPlayerSetting);
    // console.log(gameContract)
    // return
    return await gameContract.methods.payerBet([optionIndex], [amountStr])
        .send({
            ...defaultPlayerSetting,
            value: amountStr
        })
}

export const gameContract = (address) => {
    return new web3.eth.Contract(gameAbi, address);
};

export const getGameContractAddress = async (gameId) => {
    const myContract = gameWorldContract();
    const defaultSetting = await getDevDefaultSetting();
    return await myContract.methods.getGame(gameId).call(defaultSetting)
};

export const getGameState = async (address) => {
    const gameContract = new web3.eth.Contract(gameAbi, address);
    const defaultSetting = await getDevDefaultSetting();
    return await gameContract.methods.gameState().call(defaultSetting)
};


export const getGame = (address) => {
    return createMatch();
    let match = null;
    try {
        match = JSON.parse(localStorageReadOneData(`${address}_MATCHDATA`));
    }
    catch (error) {

    }
    return match
};

export const getGames = async (state = -1) => {
    // const gamesLength = localStorageReadOneData(OWNER_CREATEGAME_HISTORY);
    // alert(gamesLength)
    // alert(`gamesLength--`)
    //
    // if(!gamesLength)
    // {
    //
    //     return []
    // }
    // alert(`gamesLength--${gamesLength}`)
    const result = [];
    let gameId = 0, goOn = true;
    while (goOn) {
        console.log(1)
        try {
            const gameAddress = await getGameContractAddress(gameId);
            console.log(gameAddress)
            if (gameAddress === '0x0000000000000000000000000000000000000000') {
                goOn = false;
                break;
            }
            gameId = gameId + 1;

            // let match = null;
            // try {
            //     match = JSON.parse(localStorageReadOneData(`${gameAddress}_MATCHDATA`));
            // }
            // catch (error) {
            //
            // }
            if (state !== -1) {
                const gameState = await getGameState(gameAddress);
                if (parseInt(gameState) !== state) {
                    continue;
                }
            }
            result.push({
                address: gameAddress,
                match: createMatch()
            });
        } catch (err) {
            console.log(err)
            goOn = false;
        }
    }
    return result;
};


export const getGameOptions = async (address) => {
    const gContract = gameContract(address);
    const defaultSetting = await getDevDefaultSetting();
    // const optionsId = localStorageReadOneData(`${address}`);
    const result = [];
    let optionIndex = 1, goOn = true;
    while (goOn)  {
        const optionData = await gContract.methods.options(optionIndex).call(defaultSetting);
        // const key = `${address}_${optionIndex}`;
        console.log(optionData)
        optionIndex++;
        if(optionData.index==='0')
        {
            goOn=false;
            break;
        }

        let matchBetItem;
        matchBetItem = createMatchBetItem();
        // if (localStorageReadOneData(key)) {
        //     matchBetItem = JSON.parse(localStorageReadOneData(key))
        // }
        // else {

        //     localStorageSaveOneData(key, JSON.stringify(matchBetItem));
        // }
        result.push({
            optionData: optionData,
            matchBetItem: matchBetItem
        })
    }
    return result;
};


export const getMyBets = async () => {
    const defaultPlayerSetting = await getDevPlayerDefaultSetting();
    const games = await getGames();
    const result = [];
    for (const game of games) {
        const {address} = game;
        const match = getGame(address);
        const gameState = await  getGameState(address);
        const gameContract = new web3.eth.Contract(gameAbi, address);
        let goOn = true, count = 0;
        while (goOn) {
            try {
                const bet = await gameContract.methods.bets(count).call(defaultPlayerSetting)
                if (bet) {
                    result.push({
                        address: address,
                        bet: bet,
                        match: match,
                        gameState: gameState
                    })
                }
                count++
            } catch (err) {
                goOn = false;
            }
        }
    }
    // console.log(result.length)
    return result;
};
