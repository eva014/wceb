import React from 'react';
import moment from 'moment'
import FlexContainer from "../../../../common/FlexContainer/index";
import {getMatchDetail} from "../../../../util/api/user";
import KToast from "../../../../common/KToast";
import MatchHeader from "./MatchHeader";
import BetCategories from "./BetCategories";

export const renderTeam = (team) => {
    const {name} = team;
    return <FlexContainer direction='column'>
        <img style={{width: 50, height: 50}}/>
        <div style={{marginTop: 4}}>{name}</div>
    </FlexContainer>
};

export const renderHeader = (backgroundColor = '#0E1B31', match) => {
    // const {match, betCategories} = this.state;
    const {start, radiant, dire} = match;
    return <FlexContainer justify='center'
                          style={{padding: '20px 0', color: '#fff', backgroundColor: backgroundColor}}>
        {renderTeam(radiant)}
        <div style={{textAlign: 'center', margin: '0 20px'}}>
            <div style={{fontSize: 28}}>VS</div>
            <div style={{color: 'blue', border: '1px solid blue', borderRadius: 4}}>
                {moment(start).format('MM-DD HH:mm')}
            </div>
        </div>
        {renderTeam(dire)}
    </FlexContainer>
};

export default class MatchDetailContainer extends React.Component {

    state = {
        match: null,
    };

    componentDidMount = () => {
        const {matchId} = this.props.params;
        console.log(matchId)
        KToast.loading();
        getMatchDetail(matchId).then(result => {
            if (result.rc === 0) {
                KToast.hide();
                const {data} = result;
                this.setState({
                    match: data
                })
            }
        })
    };



    render() {
        const {match} = this.state;
        if (!match) {
            return null
        }
        return (
            <div style={{color: '#fff'}}>
                <MatchHeader match={match}/>
                <BetCategories match={match}/>
            </div>
        )
    }
}


