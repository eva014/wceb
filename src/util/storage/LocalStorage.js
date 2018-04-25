/**
 * Created by Kael on 2017/3/29.
 */
import {testGameWorldContractAddress} from "../config/contract";

export const OWNER_CREATEGAME_HISTORY='OWNER_CREATEGAME_HISTORY';

//=================Save=================
/**
 * 保存一个数据
 * @param key
 * @param value
 */
export const localStorageSaveOneData=(key,value)=>{
    localStorage[`${testGameWorldContractAddress}${key}`]=value;
};

/**
 * 读取一个数据
 * @param key
 * @returns {*}
 */
export const localStorageReadOneData=(key)=>{
    return localStorage[`${testGameWorldContractAddress}${key}`]
};

/**
 * 读取一个数据，并从存储中删除
 * @param key
 * @returns {*}
 */
export const localStorageReadOnceData=(key)=>{
    const data=localStorage[`${testGameWorldContractAddress}${key}`];
    delete localStorage[`${testGameWorldContractAddress}${key}`];
    return data
};
