import {addAddressToGame, getGame, getGameBetCategories} from "../../../../util/api/manage";
import {
    createMatchContract, createMatchOptions, getGameState, getMatchAddress,
    sendGameWinOptions
} from "../../../../util/contract/action";
import KToast from "../../../../common/KToast";


export const SG_GetGameDetail='SG_GetGameDetail';
export const SG_GetGameBetCategories='SG_GetGameBetCategories';
export const SG_GetGameState='SG_GetGameState';
export const SG_GetGameAddress='SG_GetGameAddress';
export const getGameDetail=(matchId)=>{
    return (dispatch)=>{
        // Network.get('/')
        getGame(matchId).then(result => {
            console.log(result);
            if(result.rc===0){
                const {data}=result;
                dispatch({
                    type:SG_GetGameDetail,
                    data
                })
            }
        });
        getGameBetCategories(matchId).then(result => {
            console.log(result);
            if(result.rc===0){
                const {data}=result;
                dispatch({
                    type:SG_GetGameBetCategories,
                    data
                })
            }
        });
        getGameState(matchId).then(result=>{
            dispatch({
                type:SG_GetGameState,
                gameState:result
            })
        })
        getMatchAddress(matchId).then(result=>{
            dispatch({
                type:SG_GetGameAddress,
                address:result
            })
        })
    }
};


export const createGame=()=>{
    return (dispatch,getState)=>{
        const state=getState();
        const {game,betCategories}=state;
        const {matchId}=game;
        if(matchId){
            (async ()=>{
                KToast.loading();
                let success=await createMatchContract(matchId);
                if(success)
                {
                    addAddressToGame(matchId);
                    let bets=[];
                    for(const category of betCategories)
                    {
                        const {items=[]}=category;
                        bets=bets.concat(items)
                    }

                    success=await createMatchOptions(matchId,bets);
                }
                KToast.hide();
                return success;
            })().then(success=>{
                location.reload()
            })
        }
    }
};

export const SG_CheckBetId='SG_CheckBetId';

export const checkBetId=(betItemId,checked)=>({
    type:SG_CheckBetId,
    betItemId,checked
})


export const setWinOptions=()=>{
    return (dispatch,getState)=>{
        const state=getState();
        const {checkPool,address}=state;
        const winBetIds=[];
        for(const [betId,value] of Object.entries(checkPool))
        {
            if(value===true){
                winBetIds.push(betId)
            }
        }
        if(winBetIds.length>0&&address){
            KToast.loading();
            sendGameWinOptions(address,winBetIds).then(result=>{
                if(result===true){
                    KToast.success('',2,()=>{
                        location.reload()
                    })
                }
                else {
                    KToast.hide()
                }
            })
        }
    }
}
