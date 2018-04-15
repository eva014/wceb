import React from 'react';
import {FlexContainer} from "../../../../common/FlexContainer/index";
import {hashHistory} from "react-router";

export default class HomeContainer extends React.Component {
    menuData = [
        {
            title: '赛事列表',
            router: '/matchs',
        },
        {
            title: '波胆记录',
            router: '/orders',
        },
        {
            title: '比赛结果',
            router: '',
        },
        {
            title: '平台规则',
            router: '',
        },
    ];

    render() {
        return (
            <div>
                {
                    this.menuData.map((menuItem, index) => {
                        const {title, router} = menuItem;
                        return <FlexContainer justify='center'
                                              style={{height: '60', borderBottom: '1px solid #0D62A1'}}
                                              key={index}
                                              onClick={() => {
                                                  console.log(router)
                                                  if (router) {
                                                      hashHistory.push(router)
                                                  }
                                              }}>
                            <div style={{color: '#fff'}}>
                                {title}
                            </div>
                        </FlexContainer>
                    })
                }
            </div>
        )
    }
}
