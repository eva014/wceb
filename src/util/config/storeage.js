import {localStorageReadOneData, OWNER_CREATEGAME_HISTORY} from "../storage/LocalStorage";
import {getDevDefaultSetting} from "./contract";

export const   getNextGameId = () => {
    const gameId = localStorageReadOneData(OWNER_CREATEGAME_HISTORY);
    return gameId ? (parseInt(gameId) + 1) : 0;
};

