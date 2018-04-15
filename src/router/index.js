import {hashHistory} from "react-router";

export const basePush=(path)=>{
    hashHistory.push(path)
};

export const toUserHome=()=>{
   basePush('/')
};


export const toCreateGame=()=>{
    basePush('/manage/creategame')
};

export const toCreateTeam=()=>{
    basePush('/manage/createteam')
}

export const toMatchDetail=(matchId)=>{
    basePush(`/matchdetail/${matchId}`)
}

export const toManageGameList=()=>{
    basePush(`/manage/gamelist`)
}


export const toSetUpGame=(matchId)=>{
    basePush(`manage/setupgame/${matchId}`)
}
