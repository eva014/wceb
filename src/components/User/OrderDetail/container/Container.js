import React from 'react';
import {createMatch} from "../../../../util/config/mockdata";
import {renderHeader} from "../../MatchDetail/container/Container";
import {FlexContainer} from "../../../../common/FlexContainer/index";


const texts=[`比赛时间`,`下单时间`,`下单项目`,`下单利润率`,`下单金额(eth)`,`利润金额(eth)`,`手续费(eth)`,`转账费(eth)`,`确权费(eth)`,`总收款(eth)`]

export default class OrderDetailContainer extends React.Component {
    state={
        match:createMatch()
    }

    render() {

        return (
            <div style={{color:'#fff'}}>
                {renderHeader(undefined,this.state.match)}
                {
                    texts.map((text,index)=>{
                        return <FlexContainer
                        justify='between'
                            style={{padding:'0 20px',height:44,borderBottom:'1px solid #4E5764'}} key={index}>
                            <div style={{fontSize:14}}>
                                {text}
                            </div>
                            <div>
                                xxx
                            </div>
                        </FlexContainer>
                    })
                }
            </div>
        )
    }
}


