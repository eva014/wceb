import React from 'react';
import {FlexContainer} from "../../../../common/FlexContainer/index";
import {verifyOwner} from "../../../../util/contract/action";
import KToast from "../../../../common/KToast";
import {toCreateGame, toCreateTeam, toManageGameList, toUserHome} from "../../../../router";
import {KLocal_Limited_Authority} from "../../../../util/local";

export default class ManageHomeContainer extends React.Component {
    menuData = [
        {
            title: '创建Team',
            router: toCreateTeam,
        },
        {
            title: '创建游戏',
            router: toCreateGame,
        },
        {
            title: '游戏列表',
            router: toManageGameList,
        },
    ];

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
            <div>
                {
                    this.menuData.map((menuItem, index) => {
                        const {title, router} = menuItem;
                        return <FlexContainer justify='center'
                                              style={{height: '60', borderBottom: '1px solid #0D62A1'}}
                                              key={index}
                                              onClick={() => {
                                                  if (router) {
                                                      router()
                                                  }
                                              }}>
                            <div style={{color: '#fff'}}>
                                {title}
                            </div>
                        </FlexContainer>
                    })
                }
            </div>
        )
    }
}
