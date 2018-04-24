import React from 'react';
import {getOrderList} from "../../../../util/api/user";
import CommonListView from "../../../../common/ListView";
import OrderCell from "./OrderCell";
import {MAIN_BACKGROUNDCOLOR} from "../../../../util/color";
import FlexContainer from "../../../../common/FlexContainer";


export default class MatchListContainer extends React.Component {
    render() {
        return (
            <CommonListView
                renderHeader={() => {
                    return (
                        <FlexContainer
                            justify={'between'}
                            style={{padding: '10px 20px', color: '#fff', backgroundColor: MAIN_BACKGROUNDCOLOR}}>
                            <div>{`时间`}</div>
                            <div>
                                {`下单金额 eth`}
                            </div>
                        </FlexContainer>
                    )
                }}
                requestData={(params) => {
                    return getOrderList(params)
                }} renderCell={(dataItem) => {
                console.log(dataItem)
                return <OrderCell order={dataItem}/>
            }}/>
        )
    }
}


