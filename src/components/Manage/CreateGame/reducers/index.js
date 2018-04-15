import * as Action from '../action'
import moment from 'moment'
import {CG_INITDATA} from "../action";
import {CG_Team_Change} from "../action";

const defState = {
    // teamId0: null,
    team0:null,
    // teamId1: null,
    team1:null,
    league_name: '世界杯',
    teams: [],
    start_time: moment().format('YYYY-MM-DD HH:mm:ss'),
};

const data = (state = defState, action) => {
    switch (action.type) {
        case Action.CG_InputValue_Change: {
            const {value, key} = action;
            return {
                ...state,
                [key]: value
            }
        }
        case Action.CG_Team_Change: {
            const {teamId, isLeft} = action;
            // console.log(teamId)
            let team;
            for(const t of state.teams){
                console.log(t.teamId,teamId)
                if(t.teamId===teamId){
                    team=t;
                    break;
                }
            }
            if (isLeft) {
                return {
                    ...state,
                    team0: team
                }
            }
            return {
                ...state,
                team1: team
            }
        }
        case Action.CG_INITDATA: {
            const {items = []} = action;
            return {
                ...state,
                teams: items
            }
        }
        default:
            return state;
    }
};

export default data;
