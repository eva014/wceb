import {
    createMethodsCallOptions, createMethodsSendOptions, getAccount, getGameContract,
    getGameWorldContract
} from "./util";
import {web3} from "../web3/web3";
import {createOrderBegin, createOrderEnd} from "../api/user";



export const verifyOwner = async () => {
    const contract = getGameWorldContract();
    const callFunctionOptions = await createMethodsCallOptions();
    if(callFunctionOptions){
        const result=await contract.methods.owner().call(callFunctionOptions);
        const account=await getAccount();
        return result===account;
    }
    return false;
};


export const createMatchContract=async (matchId)=>{
    const contract = getGameWorldContract();
    const sender = await createMethodsSendOptions();
    const sendResult=await contract.methods.createGame(matchId, 1, 20).send(sender);
    const {transactionHash}=sendResult;
   return !!transactionHash
};

export const getMatchAddress=async (matchId)=>{
    const contract = getGameWorldContract();
    const caller = await createMethodsCallOptions();
    const address=await contract.methods.getGame(matchId).call(caller);
    if(address==='0x0000000000000000000000000000000000000000')
    {
        return null
    }
    return address;
};


export const createMatchOptions=async (matchId,bets)=>{
    const address=await getMatchAddress(matchId);
    const gameContract=getGameContract(address);
    const sender = await createMethodsSendOptions();
    const optionsIds=[];
    const limits=[];
    const m=[];
    const d=[];
    for(const bet of bets)
    {
        const {betItemId,stock,returnRate}=bet;
        optionsIds.push(betItemId);
        limits.push(stock);
        m.push(Number(returnRate*10).toFixed(0));
        d.push(10)
    }
    const result=await gameContract.methods.setOptions(optionsIds,limits,m, d)
        .send(sender);
    console.log(result);
    const {transactionHash}=result;
    return !!transactionHash
};

export const placeBet=async (matchId,betId,amount)=>{
    const address=await getMatchAddress(matchId);
    if(address)
    {
        try{
            const gameContract=getGameContract(address);
            const sender = await createMethodsSendOptions();
            const amountStr = web3.utils.toWei(amount, 'ether').toString();
            const result=await gameContract.methods.payerBet([betId], [amountStr]).send({
                ...sender,
                value: amountStr
            }).on('transactionHash', function(hash){
                // console.log('hash'+hash)
                createOrderBegin(betId,amountStr,hash)
            });
            console.log(result);
            const {transactionHash}=result;
            if(transactionHash){
                createOrderEnd(transactionHash)
            }
            return !!transactionHash
        }
        catch (err){
            console.log(err);
            return false
        }
    }
    return false;
};

export const getGameState=async (matchId)=>{
    const address=await getMatchAddress(matchId);
   if(address){
       const gameContract=getGameContract(address);
       const caller = await createMethodsCallOptions();
       return await gameContract.methods.gameState().call(caller)
   }
   return null
};


export const openGameBets=async (address)=>{
    const gameContract=getGameContract(address);
    const sender = await createMethodsSendOptions();
    const result=await gameContract.methods.openGame().send(sender);
    console.log(result);
    const {transactionHash}=result;
    return !!transactionHash
};

export const closeGameBets=async (address)=>{
    const gameContract=getGameContract(address);
    const sender = await createMethodsSendOptions();
    const result=await gameContract.methods.closeBet().send(sender);
    console.log(result);
    const {transactionHash}=result;
    return !!transactionHash
};


export const sendGameWinOptions=async (address,wins)=>{
    const gameContract=getGameContract(address);
    const sender = await createMethodsSendOptions();
    const result=await gameContract.methods.sendResult(wins).send(sender);
    console.log(result);
    const {transactionHash}=result;
    return !!transactionHash
};

export const closeGame=async (address)=>{
    const gameContract=getGameContract(address);
    const sender = await createMethodsSendOptions();
    const result=await gameContract.methods.closeGame().send(sender);
    console.log(result);
    const {transactionHash}=result;
    return !!transactionHash
};
