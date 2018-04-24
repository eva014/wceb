/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'
import FlexContainer from "../../../../common/FlexContainer/index";
import moment from 'moment'
import {MAIN_BACKGROUNDCOLOR, MAIN_BORDERSTYLE} from "../../../../util/color";
import {Icon} from "antd-mobile";
import web3 from "../../../../util/web3/web3";
import {toOrderDetail} from "../../../../router";

class OrderCell extends React.Component {
    render() {
        const {order} = this.props;
        const {createdAt,stake}=order;

        return (
            <FlexContainer
                justify={'between'}
                style={{padding: '10px 20px', color: '#fff',
                    backgroundColor: MAIN_BACKGROUNDCOLOR,
                    borderBottom:MAIN_BORDERSTYLE}}
                onClick={() => {
                    const {transactionHash}=order;
                    toOrderDetail(transactionHash)
                    // hashHistory.push('/orderdetail')
                }}>
                <FlexContainer
                    justify={'between'}
                style={{width:'100%'}}>
                    <div>{`${moment(createdAt*1000).format('YYYY-MM-DD HH:mm:ss')}`}</div>
                    <div>
                        {`${web3.utils.fromWei(`${stake}`,'ether')} eth`}
                    </div>

                </FlexContainer>
                <Icon type={'right'}/>
            </FlexContainer>

        )
    }
}


export default OrderCell
