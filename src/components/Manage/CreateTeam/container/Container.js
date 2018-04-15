import React from 'react';
import {FlexContainer} from "../../../../common/FlexContainer/index";
import {verifyOwner} from "../../../../util/contract/action";
import KToast from "../../../../common/KToast";
import {toCreateGame,toCreateTeam, toUserHome} from "../../../../router";
import {
    KLocal_CreateTeam_Success,
    KLocal_League_Name, KLocal_Limited_Authority, KLocal_Team_Avatar, KLocal_Team_ID,
    KLocal_Team_Name
} from "../../../../util/local";
import CommonListView from "../../../../common/ListView";
import {getGameListByManage, getGameListByUsers} from "../../../../util/api/user";
import MatchCell from "../../../User/MatchList/container/MatchCell";
import {Button, Icon, InputItem, List} from "antd-mobile";
import KLocal from "../../../../util/local";
import {createTeam} from "../../../../util/api/manage";

export default class Container extends React.Component {
    state={
        avatar:null,
        teamId:null,
        name:null
    };

    componentDidMount = async () => {
        // const isOwner = await verifyOwner();
        // if (!isOwner) {
        //     KToast.info(KLocal_Limited_Authority, 2, () => {
        //         toUserHome()
        //     })
        // }
    };

    render() {
        const {teamId,name,avatar}=this.state;
        const datas = [
            {
                title:`${KLocal_Team_ID}:${teamId}`,
                values: [avatar, name],
                keys: ['avatar', 'name'],
                text: [ KLocal_Team_Avatar, KLocal_Team_Name]
            }
        ];

        return (
            <div>
                {
                    datas.map((listData, index) => {
                        const { keys, text,values} = listData;
                        return <List key={index}>
                            {
                                keys.map((key, jndex) => {
                                    const tText=KLocal.getCurrentLocalString(text[jndex]);
                                    return <InputItem key={jndex}
                                                      onChange={(value)=>{
                                                        this.setState({
                                                            [key]:value
                                                        })
                                                      }}
                                                      value={values[jndex]}
                                                      placeholder={tText}>
                                        {tText}
                                    </InputItem>
                                })
                            }
                        </List>
                    })
                }
                <Button style={{marginTop: 10}}
                        disabled={!name||!avatar}
                        onClick={() => {
                            KToast.loading();
                            createTeam(name,avatar).then(result => {
                                if(result.rc===0){
                                    KToast.success(KLocal_CreateTeam_Success,2,()=>{
                                        location.reload()
                                    })
                                }
                            })
                        }}>
                    创建队伍
                </Button>
            </div>
        )
    }
}
