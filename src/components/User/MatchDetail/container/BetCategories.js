/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import {getMatchBets} from "../../../../util/api/user";
import {MAIN_BORDERCOLOR} from "../../../../util/color";
import {PopView} from "../../../../common/PopView";
import {FlexContainer} from "../../../../common/FlexContainer";
import {Icon} from "antd-mobile";
import PlaceBet from "./PlaceBet";

class BetCategories extends React.Component {
    state={
        betCategories:[]
    };

    componentDidMount(){
        const {match}=this.props;
        if(match){
            const {matchId}=match;
            getMatchBets(matchId).then(result => {
                if(result.rc===0)
                {
                    const {data}=result;
                    this.setState({
                        betCategories:data
                    })
                    // console.log(result)
                }
            })
        }
    }

    popPlaceBet=(bet)=>{
        const {match} = this.props;
        // const header = renderHeader('transparent', match);
        const insNode = PopView(
            <PlaceBet match={match}
                      bet={bet}
                      hideClick={() => {
                          insNode.parentNode.removeChild(insNode)
                      }}/>
        )
    };


    render() {
        const {betCategories}=this.state;
        if(!betCategories||betCategories.length===0)
        {
            return null
        }
        return <div>
            {
                betCategories.map((betCategory, index) => {
                    const {name, tradeFee, serviceFee, items} = betCategory;
                    return <div key={index}>
                        <FlexContainer justify='between' style={{
                            padding: '10px 20px',
                            marginTop: 20,
                            borderBottom: `1px solid ${MAIN_BORDERCOLOR}`
                        }}>
                            <div>{name}</div>
                            <div style={{fontSize: 9}}>
                                <div>{`交易费 ${tradeFee}`}</div>
                                <div style={{marginTop: 4}}>{`手续费 ${serviceFee}`}</div>
                            </div>
                        </FlexContainer>
                        <FlexContainer style={{
                            width: '100%',
                            textAlign: 'center', height: 40, borderBottom: `1px solid ${MAIN_BORDERCOLOR}`
                        }}>
                            <div className='flex-item-full'>下注项目</div>
                            <div className='flex-item-full'>回报率</div>
                            <div className='flex-item-full'>剩余可买量</div>
                            <div style={{width: 30}}/>

                        </FlexContainer>
                        {
                            items.map((item, index) => {
                                const {name, returnRate, left} = item;
                                return <FlexContainer style={{
                                    width: '100%', textAlign: 'center',
                                    height: 40, borderBottom: `1px solid ${MAIN_BORDERCOLOR}`, position: 'relative'
                                }}
                                                      justify='around'
                                                      key={index}
                                                      onClick={() => {
                                                          this.popPlaceBet(item)
                                                      }
                                                      }>
                                    <div className='flex-item-full'>{name}</div>
                                    <div className='flex-item-full'>{returnRate}</div>
                                    <div className='flex-item-full'>{left}</div>
                                    <FlexContainer style={{width: 30}}>
                                        <Icon type='right'/>
                                    </FlexContainer>
                                </FlexContainer>
                            })
                        }
                    </div>
                })
            }
        </div>
    }
}



export default BetCategories
