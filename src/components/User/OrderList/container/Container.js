import React from 'react';
import {getOrderList} from "../../../../util/api/user";
import CommonListView from "../../../../common/ListView";
import MatchCell from "../../MatchList/container/MatchCell";



export default class MatchListContainer extends React.Component {
    render(){
        return (
            <CommonListView requestData={(params)=>{
                return getOrderList(params)
            }} renderCell={(dataItem)=>{
                console.log(dataItem)
                return  <MatchCell match={dataItem} user={false}/>
            }}/>
        )
    }
}


