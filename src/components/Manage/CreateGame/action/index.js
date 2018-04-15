import Network from "../../../../util/network/net4wc";
import moment from 'moment'
import {getTeams} from "../../../../util/api/manage";
import KToast from "../../../../common/KToast";


export const CG_INITDATA='CG_INITDATA';
export const initData=()=>{
    return (dispatch,getState)=>{
        getTeams().then(result => {
            if(result.rc===0)
            {
                const {data}=result;
                const {items=[]}=data;
                dispatch({
                    type:CG_INITDATA,
                    items
                })
            }
        })
    }
};

export const CG_Team_Change = 'CG_Team_Change';

export const choosedTeam = (isLeft, teamId) => ({
    type:CG_Team_Change,
    isLeft,
    teamId
});

export const CG_InputValue_Change = 'CG_InputValue_Change';
export const inputValueChange = (value, key) => ({
    type:CG_InputValue_Change,
    value:value,
    key:key
});


export const createGame=()=>{
    return (dispatch,getState)=>{
        const state=getState();
        const {
            team0,
            team1,
            league_name,
            start_time
        }=state;
        KToast.loading();
        Network.post('/op/match',{
            teamId0:team0.teamId,
            teamId1:team1.teamId,
            division:league_name,
            startTime:moment(start_time).unix()*1000,
            endTime:moment(start_time).add(2, 'h').unix()*1000
        }).then(result => {
           if(result.rc===0)
           {
               KToast.success('',2,()=>{
                   location.reload()
               })
           }
        })
    }
};
