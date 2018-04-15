/**
 * Created by Kael on 2018/4/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List,Picker} from 'antd-mobile'
import {choosedTeam} from "../action";

class TeamPicker extends React.Component {
    state={
        sValue:0
    };


    render() {
        const {teams,team0,team1}=this.props;
        const {choosedTeam}=this.props;
        if(teams.length===0){
            return null
        }
        const datas=teams.map(team=>{
            const {name,teamId}=team;
            return {
                label: name,
                value: teamId,
            }
        });

        return (
            <List renderHeader={() => 'Teams'}>
                <Picker
                    data={[datas]}
                    title="选择队伍"
                    cascade={false}
                    extra={team0?[team0.name]:"请选择"}
                    value={team0?[team0.teamId]:null}
                    onOk={v => {
                        choosedTeam(true,v[0])
                    }}
                >
                    <List.Item arrow="horizontal">Left Team</List.Item>
                </Picker>
                <Picker
                    data={[datas]}
                    title="选择队伍"
                    cascade={false}
                    extra={team1?[team1.name]:"请选择"}
                    value={team1?[team1.teamId]:null}
                    onOk={v => choosedTeam(false,v[0])}
                >
                    <List.Item arrow="horizontal">Right Team</List.Item>
                </Picker>
            </List>
        )
    }
}

const mapStateToProps = state => {
    const {teams,team0,team1}=state;
    return {teams,team0,team1}
}

const mapDispatchToProps = {choosedTeam}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPicker)
