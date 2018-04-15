/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List, InputItem} from 'antd-mobile'
import KLocal, {KLocal_League_Name, KLocal_Team_Avatar, KLocal_Team_ID, KLocal_Team_Name} from "../../../../util/local";
import {inputValueChange} from "../action";

class TeamEdit extends React.Component {
    render() {
        const {

            league_name,
            start_time
        } = this.props;

        const {inputValueChange}=this.props;

        const datas = [
            {
                title: 'League',
                values: [league_name],
                keys: ['league_name'],
                text: [KLocal_League_Name]
            },
            {
                title: 'Start Time',
                values: [start_time],
                keys: ['start_time'],
                text: ['开始时间']
            }

        ];

        return (
            <div>
                {
                    datas.map((listData, index) => {
                        const {title, keys, text,values} = listData;
                        return <List key={index} renderHeader={() => title}>
                            {
                                keys.map((key, jndex) => {
                                    const tText=KLocal.getCurrentLocalString(text[jndex]);
                                    return <InputItem key={jndex}
                                                      onChange={(value)=>{
                                                          inputValueChange(value,key)}
                                                      }
                                                      value={values[jndex]}
                                                      placeholder={tText}>
                                        {tText}
                                    </InputItem>
                                })
                            }
                        </List>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {

        league_name,start_time
    } = state;
    return {

        league_name,
        start_time
    }
};

const mapDispatchToProps = {inputValueChange};

export default connect(mapStateToProps, mapDispatchToProps)(TeamEdit)
