/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'
import {createGame, setWinOptions} from "../action";
import {openGameBets, closeGameBets, closeGame} from "../../../../util/contract/action";
import KToast from "../../../../common/KToast";

class CreateGameContract extends React.Component {
    getTextAndFunction=()=>{
        const {gameState,address}=this.props;
        if(gameState===0){
            return {
                text:'开放下注',
                click:() => {
                    KToast.loading();
                    openGameBets(address).then(result=>{
                        if(result){
                            KToast.success('',2,()=>{
                                location.reload()
                            })
                        }
                        else {
                            KToast.hide();
                        }
                    })
                }
            }
        }
        if(gameState===1){
            return {
                text:'关闭下注',
                click:() => {
                    KToast.loading();
                    closeGameBets(address).then(result=>{
                        if(result){
                            KToast.success('',2,()=>{
                                location.reload()
                            })
                        }
                       else {
                            KToast.hide();
                        }
                    })
                }
            }
        }
        if(gameState===2){
            return {
                text:'设置比赛结果',
                click:() => {
                    const {setWinOptions}=this.props;
                    setWinOptions()
                }
            }
        }
        if(gameState===3){
            return {
                text:'关闭',
                click:() => {
                    KToast.loading();
                    closeGame(address).then(result=>{
                        if(result){
                            KToast.success('',2,()=>{
                                location.reload()
                            })
                        }
                        else {
                            KToast.hide();
                        }
                    })
                }
            }
        }
    };


    render() {
        const {enable,address,gameState}=this.props;
        if(!enable){
            return null
        }
        if(!address){
            return (
                <Button style={{marginTop: 10}}
                    // disabled={!btnEnable}
                        onClick={() => {
                            const {createGame} = this.props;
                            createGame()
                        }}>
                    创建游戏合约
                </Button>
            )
        }
        const btnData=this.getTextAndFunction();
        if(btnData){
            const {text,click}=btnData;
            return (
                <Button style={{marginTop: 10}}
                        onClick={click}>
                    {text}
                </Button>
            )
        }
        return null
    }
}

const mapStateToProps = state => {
    const {
        game,
        betCategories,
        address,
        gameState,
    } = state;
    const {matchId}=game;
    let enable=true;
    if(!matchId||betCategories.length===0){
        enable=false;
    }
    else {
        for(const cate of betCategories){
            const {items}=cate;
            if(!items||items.length===0)
            {
                enable=false;
            }
        }
    }
    return {
        enable,address,gameState
    }
};

const mapDispatchToProps = {createGame,setWinOptions};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameContract)
