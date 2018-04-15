/**
 * Created by Kael on 2018/3/21.
 */
import React from 'react'
import {MAIN_BORDERCOLOR} from "../../../../util/color";
import {FlexContainer} from "../../../../common/FlexContainer/index";
import {Icon} from "antd-mobile";
import Header from "./Header";
import {placeBet} from "../../../../util/contract/action";
import KToast from "../../../../common/KToast";

class PlaceBet extends React.Component {
    betDefaults=[`0.01`,`0.05`,`0.1`,`0.5`,`1`,`2`,`5`,`10`];
    state={
        selectedIndex:0,
        inputValue:this.betDefaults[0],
    };

    payerBet=()=>{
        const {match,hideClick,bet}=this.props;
        const {inputValue}=this.state;
        const {matchId}=match;
        const {betId}=bet;
        if(matchId&&betId&&inputValue){
            KToast.loading();
            placeBet(matchId,betId,inputValue).then(result=>{
                if(result){
                   KToast.success('',2,()=>{
                       location.reload()
                   })
                }
                else {
                    KToast.hide()
                }
            })
        }

        // const {index}=optionData;
        // const {inputValue}=this.state;
        // Toast.loading('下单中,',1,()=>{
        //     doPlayerBet(address,index,inputValue).then(result=>{
        //         console.log(result)
        //         const {transactionHash}=result;
        //         if(transactionHash)
        //         {
        //             Toast.info('下注成功',2,()=>{
        //                 location.reload()
        //             });
        //
        //         }
        //     })
        // })

    };

    selectedIndexChange=(selectedIndex)=>{
        this.setState({
            selectedIndex:selectedIndex,
            inputValue:this.betDefaults[selectedIndex]
        });
    };

    inputValueChange=(value)=>{
        this.setState({
            inputValue:value
        });
        for(let i=0;i<this.betDefaults.length;i++)
        {
            const betDefault=this.betDefaults[i];
            if(betDefault===value){
                this.setState({
                    selectedIndex:i
                });
                return
            }
        }
        this.setState({
            selectedIndex:-1
        });
    };



    render() {
        const {match,bet,hideClick}=this.props;
        const {selectedIndex}=this.state;
        const {returnRate,name}=bet;
        return (
            <div style={{
                width: '90%',
                backgroundColor: "#021935",
                border: `1px solid ${MAIN_BORDERCOLOR}`,
                color: '#fff',
                textAlign: 'center'
            }}>
                <FlexContainer justify='between'
                               style={{padding: '10px 12px 0 12px', width: '100%', boxSizing: 'border-box'}}>
                    <div style={{color: '#fff', fontSize: 20}}>波胆下单</div>
                    <div onClick={hideClick}>
                        <Icon type='cross' color='#fff'/>
                    </div>
                </FlexContainer>
                <Header match={match} backgroundColor={'transparent'}/>
                <div style={{width: '100%', borderTop: '1px solid #4C5B70'}}>
                    <FlexContainer justify='center' direction='column' style={{padding: '0 10px'}}>
                        <div style={{width: '100%', borderBottom: '1px solid #4C5B70', padding: '20px 0', fontSize: 16}}>
                            {`你正在 `}<span style={{color: 'yellow'}}>投注</span>{`: 比分为 ${name}`}
                        </div>
                        <div style={{padding:'12px 0',width:'100%'}}>
                            <FlexContainer style={{width:'100%'}}>
                                {
                                    [`下注金额(eth)`,`回报率`,`利润额(eth)`].map((text,index)=>{
                                        return <div style={{fontSize:9,width:'33.33%'}} key={index}>
                                            {text}
                                        </div>
                                    })
                                }
                            </FlexContainer>
                            <FlexContainer style={{width:'100%',marginTop:6}}>
                                {
                                    [``,returnRate,`xxxx`].map((text,index)=>{
                                        return <FlexContainer justify='center'
                                                              style={{fontSize:18,width:'33.33%',height:40}}
                                                              key={index}>
                                            {
                                                index===0?
                                                    <input style={{width:'60px',height:30,
                                                        backgroundColor:'transparent',color:'#fff'}}
                                                     value={this.state.inputValue}
                                                           onChange={(e)=>{
                                                         const {value=''}=e;
                                                    this.inputValueChange(value)
                                                    }}/>
                                                    :
                                                    <div>
                                                        {text}
                                                    </div>
                                            }
                                        </FlexContainer>
                                    })
                                }
                            </FlexContainer>
                            <FlexContainer wrap={'wrap'} style={{marginTop:10}}>
                                {
                                    this.betDefaults.map((defaultItem,index)=>{
                                        return <div style={{width:'25%',padding:4,boxSizing:'border-box'}} key={index}>
                                            <FlexContainer direction='column'
                                                           style={{border:'1px solid #4C5B70',
                                                               padding:'10px 0 2px 0',
                                                               backgroundColor:selectedIndex===index?'#FDA929':null}}
                                            onClick={()=>{
                                                this.selectedIndexChange(index)
                                            }}>
                                                <div style={{fontSize:18}}>
                                                    {defaultItem}
                                                </div>
                                                <div style={{fontSize:6,color:selectedIndex===index?'#fff':'#4C5B70'}}>eth</div>
                                            </FlexContainer>
                                        </div>
                                    })
                                }
                            </FlexContainer>
                            <FlexContainer justify='center'
                                           style={{marginTop:'6px',width:'100%',height:44,backgroundColor:'#FDA929'}}
                            onClick={this.payerBet}>
                                <div style={{fontSize:14}}>确认</div>
                            </FlexContainer>
                        </div>
                    </FlexContainer>
                </div>

            </div>
        )
    }
}


export default PlaceBet
