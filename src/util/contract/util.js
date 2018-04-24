import web3 from "../web3/web3";
import {gameAbi, gameworldAbi} from "../web3/abi";
import KToast from "../../common/KToast";
import {KLocal_GetAccount_Fail} from "../local";

// export const gameWorldContractAddress = '0xd36c2cee95bbbe3fed2085240b541662e601e434';

export const gameWorldContractAddress='';

export const getGameWorldContract = () => {
    return new web3.eth.Contract(gameworldAbi, gameWorldContractAddress);
};

export const getGameContract = (address) => {
    return new web3.eth.Contract(gameAbi, address);
};


/**
 * 取钱包账户,默认取第一个
 * @param index
 * @returns {Promise<*>}
 */
export const getAccount = async (index = 0) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log(`web3-getAccount`,accounts)
        if (accounts.length > 0) {
            return accounts[index];
        }
        return null;
    }
    catch (err) {
        KToast.fail(KLocal_GetAccount_Fail);
        return null;
    }
};


export const getAccountBalance=async (account)=>{
    return await web3.eth.getBalance(account);
}

export const createMethodsCallOptions = async () => {
    try {
        const account = await getAccount();
        if (account) {
            return {from: account}
        }
        return null;
    }
    catch (err) {
        return null;
    }
};


export const createMethodsSendOptions = async () => {
    try {
        const account = await getAccount();
        if (account) {
            return {from: account,gas: 1500000}
        }
        return null;
    }
    catch (err) {
        return null;
    }
};

