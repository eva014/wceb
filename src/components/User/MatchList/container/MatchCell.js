/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'
import {FlexContainer} from "../../../../common/FlexContainer/index";
import moment from 'moment'
import {MAIN_BACKGROUNDCOLOR, MAIN_BORDERCOLOR} from "../../../../util/color";
import {Icon} from "antd-mobile";
import {toMatchDetail} from "../../../../router";
import {getGameState} from "../../../../util/contract/action";


class MatchCell extends React.Component {
    state = {
        address: '',
        match: null,
        show:false,
    };

    componentDidMount = () => {
        const {match} = this.props;
        if (match) {
            const {matchId}=match;
            getGameState(matchId).then(gameState=>{
                this.setState({
                    show:gameState==='1'
                })
            })
        }
    };

    render() {
        const {match, user} = this.props;
        // const {address}=match;
        if (!match) {
            return null;
        }
        const {show}=this.state;
        if(!show){
            return null;
        }

        const {league, start, radiant, dire} = match;
        // console.log(this.props.rowID);


        return (
            <FlexContainer
                style={{
                    padding: '10px 20px', color: '#fff',
                    backgroundColor: MAIN_BACKGROUNDCOLOR, borderBottom: `1px solid ${MAIN_BORDERCOLOR}`
                }}
                onClick={() => {
                    if (user) {
                        const {matchId} = match;
                        toMatchDetail(matchId)
                    }
                }}>
                {
                    league
                    &&
                    <div style={{fontSize: 10}}>{`[${league}]`}</div>
                }
                <div style={{marginLeft: '10px'}}>
                    <div>
                        {`${radiant.name} VS ${dire.name}`}
                    </div>
                    <div style={{marginTop: 4}}>
                        {moment(start).format('MM-DD HH:mm')}
                    </div>
                </div>
                {
                    user === true
                    &&
                    <div style={{marginLeft: 'auto'}}>
                        <Icon type={'right'}/>
                    </div>
                }

            </FlexContainer>
        )
    }
}


export default MatchCell
