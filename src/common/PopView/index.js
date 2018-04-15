import React from 'react'
import ReactDOM from "react-dom";
import Container from "./container/Container";

export const PopView = (view, callBack) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    ReactDOM.render(
        <Container view={view}/>
            , div);

    return div;
};
