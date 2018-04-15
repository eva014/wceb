import React from 'react';
import {Button, List} from "antd-mobile";
import {web3} from '../../../../util/web3/web3'
import {gameworldAbi} from "../../../../util/web3/abi";
import {
    testOwnerAccountIndex, testGameWorldContractAddress,
    getGameContractAddress, getGames
} from "../../../../util/config/contract";
import {
    localStorageSaveOneData,
    OWNER_CREATEGAME_HISTORY
} from "../../../../util/storage/LocalStorage";
import GameCell from "./GameCell";
import {createMatch} from "../../../../util/config/mockdata";
import {verifyOwner} from "../../../../util/contract/action";
import {toUserHome} from "../../../../router";
import KToast from "../../../../common/KToast";
import {KLocal_Limited_Authority} from "../../../../util/local";
import {createGameInfo} from "../../../../util/api/manage";

export default class Container extends React.Component {

    constructor()
    {
        super();
        // const gameId = this.getNextGameId();
        this.state={
            games:[]
        }
    }


    componentDidMount=async ()=>{
        const isOwner=await verifyOwner();
        if(!isOwner){
            KToast.info(KLocal_Limited_Authority,2,()=>{
                toUserHome()
            })
        }
        else {
            getGames().then(result=>{
                this.setState({
                    games:result
                })
            })
        }
    };

    getNextGameId = () => {
        // const gameId = localStorageReadOneData(OWNER_CREATEGAME_HISTORY);
        return this.state.games.length;
    };


    createGame = async () => {
       return createGameInfo().then(result=>{

        })
        // const myContract = new web3.eth.Contract(gameworldAbi, testGameWorldContractAddress);
        //
        // const accounts = await web3.eth.getAccounts();
        // console.log(accounts)
        // const owner = accounts[testOwnerAccountIndex];
        // const defaultSetting = {from: owner, gas: 1500000, gasPrice: '0'};
        // const nextGame = this.getNextGameId();
        // return myContract.methods.createGame(nextGame, 1, 20).send(defaultSetting).then(result => {
        //     // alert(JSON.stringify(result));
        //     const {transactionHash}=result;
        //     if(transactionHash){
        //         localStorageSaveOneData(OWNER_CREATEGAME_HISTORY,String(nextGame));
        //         getGameContractAddress(nextGame).then(address=>{
        //             localStorageSaveOneData(`${address}_MATCHDATA`,JSON.stringify(createMatch()))
        //         });
        //         return nextGame;
        //     }
        //     return 0;
        // });
    };


    render() {
        const {games}=this.state;
        return (
            <div style={{color: '#fff'}}>
                <Button style={{marginTop: 10, marginLeft: 10, width: '80%'}} onClick={() => {
                    this.createGame().then(result => {
                        getGames().then(items=>{
                            this.setState({
                                games:items.concat([])
                            })
                        })
                    })
                }}>新增一个游戏(游戏信息随机)</Button>
                <div>
                    game列表
                </div>
                <List>
                    {
                        games.map((dataItem,index)=>{
                            return <GameCell key={index} data={dataItem}/>
                        })
                    }
                </List>
            </div>
        )
    }
}


