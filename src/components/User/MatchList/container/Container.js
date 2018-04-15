import React from 'react';
import MatchCell from "./MatchCell";
import {getGameListByUsers} from "../../../../util/api/user";
import CommonListView from "../../../../common/ListView";


export default class MatchListContainer extends React.Component {
   render(){
       return (
           <CommonListView requestData={(params)=>{
               return getGameListByUsers(params)
           }} renderCell={(dataItem)=>{
               console.log(dataItem)
               return  <MatchCell match={dataItem} user={true}/>
           }}/>
       )
   }
}


