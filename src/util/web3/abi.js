const gameWorld=require('../../../../contract/build/contracts/GameWorld')
const game=require('../../../../contract/build/contracts/Game')

export const gameAbi=game.abi;
export const gameData=game.bytecode;

export const  gameworldAbi=gameWorld.abi;
export const  gameworldData=gameWorld.bytecode;
