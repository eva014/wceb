import Network from "../network/net4wc";
import {getAccount} from "../contract/util";

export const getGameListByUsers = (params) => {
    return Network.get('/match/list', params)
};

export const getGameHistory =async (params) => {
    // const account=await getAccount();
    return Network.get('/match/history', {
        ...params,
        // account
    })
};


export const getGameListByManage= (params) => {
    return Network.get('/op/matches', params)
};

export const getMatchDetail = (matchId) => {
    return Network.get('/match/detail', {
        matchId
    })
};

export const getMatchBets=(matchId) => {
    return Network.get('/match/bets', {
        matchId
    })
};

export const getOrderDetail=(transactionHash)=>{
    return Network.get(`/match/order/${transactionHash}`).then(result=>{
        if(result.rc===0){
            const {data}=result;
            return data;
        }
        return {}
    })
}

export const getOrderList=async (params)=>{
    const account=await getAccount();
    return Network.get('/match/orders', {
        ...params,
        account:account,
    })
};

export const createOrderBegin=(betId,amountStr,hash)=>{
    console.log(`createOrderBegin---${hash}`);
    return getAccount().then(account=>{
        if(account){
            return Network.post('/match/order/begin', {
                account:account,
                betItemId:betId,
                stake:amountStr,
                transactionHash:hash
            })
        }
    })
};

export const createOrderEnd=(hash)=>{
    console.log(`createOrderEnd---${hash}`);
    return getAccount().then(account=>{
        if(account){
            return Network.post('/match/order/end', {
                account:account,
                transactionHash:hash
            })
        }
    })
};
