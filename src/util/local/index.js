
export const KLocal_GetAccount_Fail='KLocal_GetAccount_Fail';//获取账户信息失败
export const KLocal_Limited_Authority='KLocal_Limited_Authority';//获取权限不够


export const KLocal_Team_Avatar='KLocal_Team_Avatar';//队伍头像
export const KLocal_Team_Name='KLocal_Team_Name';//队伍名字
export const KLocal_Team_ID='KLocal_Team_ID';//队伍ID
export const KLocal_League_Name='KLocal_League_Name';//联赛名字


export const KLocal_Hud_Loading='KLocal_Hud_Loading';//加载中...

export const KLocal_CreateTeam_Success='KLocal_CreateTeam_Success';//创建队伍成功
export const KLocal_CreateGame_Success='KLocal_CreateGame_Success';//创建游戏成功


export const KLocal={};

const datas=require('./schinese');

KLocal.getCurrentLocalString=(key)=>{
    return datas[key]?datas[key]:key;
};



export default KLocal;

