import * as Action from '../action'

const defState = {
    game: {},
    betCategories: [],
    gameState:0,
    address:'',
    checkPool:{},
};

const data = (state = defState, action) => {
    switch (action.type) {
        case Action.SG_GetGameDetail: {
            const {data} = action;
            return {
                ...state,
                game: data
            }
        }
        case Action.SG_GetGameBetCategories: {
            const {data} = action;
            return {
                ...state,
                betCategories: data
            }
        }
        case Action.SG_GetGameState:{
            const {gameState}=action;
            return {
                ...state,
                gameState: parseInt(gameState),
                checkMode:parseInt(gameState)===2
            }
        }
        case Action.SG_GetGameAddress:{
            const {address}=action;
            return {
                ...state,
                address: address
            }
        }
        case Action.SG_CheckBetId:{
            const {checkPool}=state;
            const {betItemId,checked}=action;
            return {
                ...state,
                checkPool: {
                    ...checkPool,
                    [betItemId]:checked
                }
            }
        }
        default:
            return state;
    }
};

export default data;
