/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'
import FlexContainer from "../../../../common/FlexContainer/index";
import moment from 'moment'
import {MAIN_BACKGROUNDCOLOR, MAIN_BORDERCOLOR} from "../../../../util/color";
import {toMatchDetail} from "../../../../router";


class MatchResultCell extends React.Component {
    state = {
        address: '',
        match: null,
        show:true,
    };

    componentDidMount = () => {
        // const {match} = this.props;
        // if (match) {
        //     const {matchId}=match;
        //     getGameState(matchId).then(gameState=>{
        //         this.setState({
        //             show:gameState==='1'
        //         })
        //     })
        // }
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

        console.log(111)

        const {division, start, radiant, dire,direScore,radiantScore
        } = match;
        // console.log(this.props.rowID);


        return (
            <FlexContainer
                style={{
                    padding: '10px 20px', color: '#fff',
                    backgroundColor: MAIN_BACKGROUNDCOLOR, borderBottom: `1px solid ${MAIN_BORDERCOLOR}`
                }}>
                {
                    division
                    &&
                    <div style={{fontSize: 10}}>{`[${division}]`}</div>
                }
                <div style={{marginLeft: '10px'}}>
                    <div>
                        {`${radiant.name} VS ${dire.name}`}
                    </div>
                    <div style={{marginTop: 4}}>
                        {moment(start*1000).format('MM-DD HH:mm')}
                    </div>
                </div>
                <div style={{marginLeft: 'auto'}}>
                    <div>
                        {`上半场:${direScore.firstHalf!==null?direScore.firstHalf:'-'} : ${radiantScore.firstHalf!==null?radiantScore.firstHalf:'-'}`}
                    </div>
                    <div style={{marginTop: 4}}>
                        {`全场:${direScore.fullTime!==null?direScore.fullTime:'-'} : ${radiantScore.fullTime!==null?radiantScore.fullTime:'-'}`}
                    </div>
                </div>
            </FlexContainer>
        )
    }
}


export default MatchResultCell
