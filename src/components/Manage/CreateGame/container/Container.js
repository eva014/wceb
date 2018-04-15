import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {verifyOwner} from "../../../../util/contract/action";
import {toUserHome} from "../../../../router";
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import KToast from "../../../../common/KToast";
import {KLocal_Limited_Authority} from "../../../../util/local";
import Config from '../../../../util/config'
import {initData} from '../action'
import GameEdit from "./GameEdit";
import CreateGame from "./CreateGame";
import TeamPicker from "./TeamPicker";

export default class Container extends React.Component {
    middleware = Config.IsDebug ? [thunk, createLogger()] : [thunk];
    store = createStore(rootReducer, applyMiddleware(...this.middleware));


    constructor() {
        super();
        this.store.dispatch(initData())
    }

    componentDidMount = async () => {
        const isOwner = await  verifyOwner();
        if (!isOwner) {
            KToast.info(KLocal_Limited_Authority, 2, () => {
                toUserHome()
            })
        }
    };


    render() {

        return (
            <Provider store={this.store}>
                <div>
                    <TeamPicker/>
                    <GameEdit/>
                    <CreateGame/>
                </div>
            </Provider>
        )
    }
}


