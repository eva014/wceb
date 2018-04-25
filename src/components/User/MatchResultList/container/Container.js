import React from 'react';
import MatchResultCell from "./MatchResultCell";
import {getGameHistory} from "../../../../util/api/user";
import CommonListView from "../../../../common/ListView";
import {List,DatePicker} from 'antd-mobile'
import moment from 'moment'

export default class MatchListContainer extends React.Component {
    state={
        date:moment().toDate(),
        days:0,
        remove:false,
    }

    render() {
        // console.log(moment().format('YYYY-MM-DD').toDate())
        const {remove}=this.state;
        if(remove){
            return null
        }

        const {days}=this.state;
        console.log(this.state.days)
        return (
            <CommonListView
                renderHeader={()=>{
                    return <List>
                        <DatePicker
                            mode='date'
                            maxDate={moment().toDate()}
                            minDate={moment('2018-03-01').toDate()}
                            value={this.state.date}
                            onChange={date =>{
                                this.setState({
                                    remove:true
                                },()=>{
                                    this.setState({ date,
                                        days:moment().diff(date,'days'),
                                    remove:false})
                                })

                            }}
                        >
                            <List.Item arrow="horizontal">比赛日期</List.Item>
                        </DatePicker>
                    </List>
                }}
                requestData={(params) => {
                    return getGameHistory({
                        ...params,
                        days
                    })
                }} renderCell={(dataItem) => {
                return <MatchResultCell match={dataItem} user={true}/>
            }}/>
        )
    }
}


