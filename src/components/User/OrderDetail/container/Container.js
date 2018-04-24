import React from 'react';
import FlexContainer from "../../../../common/FlexContainer/index";
import {getMatchDetail, getOrderDetail} from "../../../../util/api/user";
import MatchHeader from "../../MatchDetail/container/MatchHeader";
import moment from 'moment'
import web3 from '../../../../util/web3/web3'
import  BigNumber from "bignumber.js";

export default class OrderDetailContainer extends React.Component {
    state = {
        match: {},
        order: {},
        transactionObject:{},
    };
    componentDidMount = async () => {
        console.log(this.props);
        const {hash} = this.props.params;
        const orderInfo = await getOrderDetail(hash);
        const {matchId} = orderInfo;
        const matchResult = await getMatchDetail(matchId);
        const transactionObject=await web3.eth.getTransaction(hash);

        if (matchResult.rc === 0) {
            const {data} = matchResult;
            this.setState({
                order: orderInfo,
                match: data,
                transactionObject:transactionObject
            })
        }
    };

    formaterEth=(profit)=>{
        const profitBigNumber=new BigNumber(profit);
        console.log(profitBigNumber.comparedTo(0))
        if(profitBigNumber.comparedTo(0)<0){
            // console.log(profitBigNumber.absoluteValue().toString())
            return `-${web3.utils.fromWei(profitBigNumber.absoluteValue().toString(),'ether')} eth`
        }
        return `${web3.utils.fromWei(profitBigNumber.absoluteValue(),'ether')} eth`
    }

    render() {

        const {match, order} = this.state;
        if(!match||Object.keys(match).length===0){
            return null
        }
        const {transactionObject}=this.state;
        const {value,gasPrice,gas}=transactionObject;

        const {createdAt,profitRate,betItemName,serviceFee,profit,win}=order;

        const {start}=match;
        const texts = [
            {
                title: '比赛时间',
                value: moment(start*1000).format('YYYY-MM-DD HH:mm:ss'),
            }, {
                title: '下单时间',
                value: moment(createdAt*1000).format('YYYY-MM-DD HH:mm:ss'),
            }, {
                title: '下单项目',
                value: betItemName,
            }, {
                title: '下单利润率',
                value: `${profitRate*100}%`,
            }, {
                title: '下单金额(eth)',
                value: `${web3.utils.fromWei(`${value}`,'ether')} eth`,
            }, {
                title: '利润金额(eth)',
                value: profit!==null?this.formaterEth(profit):'',
            }, {
                title: '手续费(eth)',
                value: serviceFee!==null?`${web3.utils.fromWei(`${serviceFee}`,'ether')} eth`:'',
            }, {
                title: '转账费(eth)',
                value: `${web3.utils.fromWei(new BigNumber(gasPrice).times(gas).toString(),'ether')} eth`,
            }, {
                title: '总收款(eth)',
                value: win!==null?`${web3.utils.fromWei(`${win}`, 'ether')} eth`:'',
            }];

        return (
            <div>
                <MatchHeader match={match}/>
                {
                    texts.map((dataItem, index) => {
                        const {title,value}=dataItem;
                        return <FlexContainer
                            justify='between'
                            style={{padding: '0 20px', height: 44, borderBottom: '1px solid #4E5764'}} key={index}>
                            <div style={{fontSize: 14}}>
                                {title}
                            </div>
                            <div>
                                {value}
                            </div>
                        </FlexContainer>
                    })
                }
            </div>
        );
    }
}


