/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import {getMatchBets} from "../../../../util/api/user";
import {MAIN_BORDERCOLOR} from "../../../../util/color";
import {PopView} from "../../../../common/PopView";
import FlexContainer from "../../../../common/FlexContainer";
import {Icon} from "antd-mobile";
import PlaceBet from "./PlaceBet";
import {getCategoryNameByType} from "../../../../util/InformationOfficer";
import web3 from '../../../../util/web3/web3'
import moment from 'moment'
import KToast from "../../../../common/KToast";

class BetCategories extends React.Component {
    state = {
        betCategories: []
    };

    componentDidMount() {
        const {match} = this.props;
        if (match) {
            const {matchId} = match;
            getMatchBets(matchId).then(result => {
                if (result.rc === 0) {
                    const {data = []} = result;
                    const temp = {
                        1: [],
                        2: [],
                        3: [],
                        4: [],
                    };

                    data.forEach((bet) => {
                        const {type} = bet;
                        // bet.index=index;
                        const tempArray = temp[type];
                        tempArray.push(bet);
                    });

                    return [1, 2, 3, 4].map(type => {
                        return {
                            name: getCategoryNameByType(type),
                            items: temp[type],
                            type,
                        }
                    })
                }
                return []
            }).then((betCategories) => {
                this.setState({
                    betCategories
                })
            })
        }
    }

    popPlaceBet = (bet) => {
        const {match} = this.props;
        if (match) {
            const {betBeginTime, betEndTime} = match;
            if (moment().isBefore(moment(betBeginTime * 1000))) {
                KToast.info('未到下注时间');
                return;
            }
            if (moment().isAfter(moment(betEndTime * 1000))) {
                KToast.info('已过下注时间');
                return;
            }
            const insNode = PopView(
                <PlaceBet match={match}
                          bet={bet}
                          hideClick={() => {
                              insNode.parentNode.removeChild(insNode)
                          }}/>
            )
        }
    };


    render() {
        const {betCategories} = this.state;
        if (!betCategories || betCategories.length === 0) {
            return null
        }
        const {match} = this.props;

        const {tradingFee, serviceFee} = match;

        return <div>
            {
                betCategories.map((betCategory, index) => {
                    const {name, items} = betCategory;
                    return <div key={index}>
                        <FlexContainer justify='between' style={{
                            padding: '10px 20px',
                            marginTop: 20,
                            borderBottom: `1px solid ${MAIN_BORDERCOLOR}`
                        }}>
                            <div>{name}</div>
                            <div style={{fontSize: 9}}>
                                <div>{`交易费 ${tradingFee}`}</div>
                                <div style={{marginTop: 4}}>{`手续费 ${serviceFee * 100}%`}</div>
                            </div>
                        </FlexContainer>
                        <FlexContainer style={{
                            width: '100%',
                            textAlign: 'center', height: 40, borderBottom: `1px solid ${MAIN_BORDERCOLOR}`
                        }}>
                            <div className='flex-item-full'>下注项目</div>
                            <div className='flex-item-full'>回报率</div>
                            <div className='flex-item-full'>剩余可买量(eth)</div>
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
                                    <div className='flex-item-full'>{web3.utils.fromWei(`${left}`, 'ether')}</div>
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
