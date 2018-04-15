import React from 'react';
import {FlexContainer} from "../../../../common/FlexContainer/index";
import {verifyOwner} from "../../../../util/contract/action";
import KToast from "../../../../common/KToast";
import {toSetUpGame, toUserHome} from "../../../../router";
import {KLocal_Limited_Authority} from "../../../../util/local";
import CommonListView from "../../../../common/ListView";
import {getGameListByManage,} from "../../../../util/api/user";
import {Icon} from "antd-mobile";

export default class ManageHomeContainer extends React.Component {
    // menuData = [
    //     {
    //         title: '创建游戏',
    //         router: toCreateGame,
    //     },
    // ];

    componentDidMount = async () => {
        const isOwner = await verifyOwner();
        if (!isOwner) {
            KToast.info(KLocal_Limited_Authority, 2, () => {
                toUserHome()
            })
        }
    };

    render() {


        return (
            <CommonListView
                requestData={(params) => {
                    return getGameListByManage(params)
                }}
                renderCell={(dataItem) => {
                    const {address, matchId} = dataItem;
                    return <FlexContainer justify='between'
                                          style={{
                                              padding: '12', borderBottom: '1px solid #0D62A1', color: '#fff',
                                              boxSizing: 'border-box', width: '100%'
                                          }}
                                          onClick={() => {
                                              // toCreateGame()
                                              toSetUpGame(matchId)
                                          }}>
                        <div style={{width: '80%'}}>
                            <div>
                                {`address:${address}`}
                            </div>
                            <div>
                                {`matchId:${matchId}`}
                            </div>
                        </div>
                        <div>
                            <Icon type={'right'}/>
                        </div>
                    </FlexContainer>
                }}/>
        )
    }
}
