import React from 'react';
import {List} from "antd-mobile";
import {
   gameWorldContract,
    getDevDefaultSetting
} from "../../../../util/config/contract";
import {MAIN_BACKGROUNDCOLOR} from "../../../../util/color";
import {hashHistory} from 'react-router'
import MatchCell from "../../../User/MatchList/container/MatchCell";
import {localStorageReadOneData, OWNER_CREATEGAME_HISTORY} from "../../../../util/storage/LocalStorage";

export default class Container extends React.Component {

    constructor()
    {
        super();
        this.state= {
            gameAddress: '',
            match: null
        }
    }

    // getGameContractAddress = async () => {
    //     const {gameId}=this.props;
    //     const myContract = gameWorldContract();
    //     const defaultSetting = await getDevDefaultSetting() ;
    //     return await myContract.methods.getGame(gameId).call(defaultSetting)
    // };
    //
    // componentDidMount=()=>{
    //     this.getGameContractAddress().then(address => {
    //         let match=null
    //         try {
    //             match = JSON.parse(localStorageReadOneData(`${address}_MATCHDATA`));
    //         }
    //         catch (error){
    //
    //         }
    //
    //         this.setState({
    //             gameAddress:address,
    //             match:match
    //         })
    //     })
    // };





    render() {
        const {data}=this.props;
        const {address,match}=data;
        return (
            <div style={{backgroundColor:'#fff',color:MAIN_BACKGROUNDCOLOR}}>
                {
                    match
                    &&
                    <div>
                        <MatchCell data={data} user={false}/>
                    </div>
                }
                <List.Item extra={'选项设置'} onClick={()=>{
                    hashHistory.push(`/setupgame/${address}`)
                }}>
                    {address}
                </List.Item>
            </div>
        )
    }
}


