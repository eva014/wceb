import Network from "../network/net4wc";
import {getMatchAddress} from "../contract/action";

export const createGameInfo=()=>{

};

export const getGame=(matchId)=>{
    return Network.get(`/op/matche/${matchId}`)
};

export const getGameBetCategories=(matchId)=>{
    return Network.get(`/op/bet/categories/${matchId}`)
};


export const createTeam=(name,avatar)=>{
    return Network.post('/op/team',{
        name,avatar
    })
};


export const getTeams=()=>{
    return Network.get('/op/teams')
};


export const createACategory=(matchId,categoryName)=>{
    return Network.post('/op/bet/category',{matchId,categoryName})

};


export const createABet=(matchId,betCategoryId,bet)=>{
    const {name,returnRate,stock}=bet;
    return Network.post('/op/bet/item',{matchId,betCategoryId,name,returnRate,stock})

};

export const addAddressToGame=(matchId)=>{
    return getMatchAddress(matchId).then(address=>{
        if(address){
            return Network.post('/op/match',{matchId,address})
        }
        return false
    })

};
