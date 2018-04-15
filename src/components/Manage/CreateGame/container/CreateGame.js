/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'
import {createGame} from "../action";

class CreateGame extends React.Component {
    render() {
        const {
            team0,
            team1,
        } = this.props;

        const btnEnable = team0 && team1;


        return (
            <Button style={{marginTop: 10}}
                    disabled={!btnEnable}
                    onClick={() => {
                        const {createGame} = this.props;
                        createGame()
                    }}>
                创建游戏
            </Button>
        )
    }
}

const mapStateToProps = state => {
    const {
        team0,
        team1,
    } = state;
    return {
        team0,
        team1,
    }
};

const mapDispatchToProps = {createGame};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
