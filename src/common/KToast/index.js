import React from 'react'
import {Toast} from 'antd-mobile';
import KLocal, {KLocal_Hud_Loading} from "../../util/local";
export const KToast={};

KToast.info=(content='',duration=2,onClose=null,mask=false)=>{
    Toast.info(
        KLocal.getCurrentLocalString(content),
        duration, onClose, mask
    )
};

KToast.fail=(content='',duration=2,onClose=null,mask=false)=>{
    Toast.fail(
        KLocal.getCurrentLocalString(content),
        duration, onClose, mask
    )
};

KToast.loading=(content=KLocal_Hud_Loading,duration=999,onClose=null,mask=false)=>{
    Toast.loading(
        KLocal.getCurrentLocalString(content),
        duration, onClose, mask
    )
};

KToast.success=(content='',duration=2,onClose=null,mask=false)=>{
    Toast.success(
        KLocal.getCurrentLocalString(content),
        duration, onClose, mask
    )
};

KToast.hide=()=>{
    Toast.hide()
};

export default KToast;

