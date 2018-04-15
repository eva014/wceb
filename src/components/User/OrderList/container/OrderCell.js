/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'
import {FlexContainer} from "../../../../common/FlexContainer/index";
import moment from 'moment'
import {MAIN_BACKGROUNDCOLOR} from "../../../../util/color";
import {Icon} from "antd-mobile";
import {hashHistory} from 'react-router'
import {web3} from "../../../../util/web3/web3";
import {gameStateText} from "../../../../util/InformationOfficer";

class OrderCell extends React.Component {
    render() {
        const {data} = this.props;
        const {match,bet,address,gameState}=data;
        const {amount,win}=bet;
        // console.log(bet)
        const {league, start, radiant, dire} = match;
        // console.log(match)
        return (
            <FlexContainer
                direction={'column'}
                justify={'between'}
                style={{padding: '10px 20px', color: '#fff', backgroundColor: MAIN_BACKGROUNDCOLOR}}
                onClick={() => {
                    // hashHistory.push('/orderdetail')
                }}>
                <div style={{fontSize: 10}}>{`${address}`}</div>
                <div style={{fontSize: 10}}>{`${radiant.name} VS ${dire.name}`}</div>
                <div>
                    {
                        gameStateText(gameState)
                    }
                </div>
                {
                    gameState>2
                    &&
                        <div style={{color:win?'red':'green'}}>
                            {win?'win':'lose'}
                        </div>
                }
                <FlexContainer  justify={'center'}>
                    <div style={{}}>
                        {`${amount} wei`}
                    </div>
                    {/*<Icon type={'right'}/>*/}
                </FlexContainer>
            </FlexContainer>
        )
    }
}


export default OrderCell
