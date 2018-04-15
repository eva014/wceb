/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import moment from "moment";
import {FlexContainer} from "../../../../common/FlexContainer";
import Team from "./Team";


class Header extends React.Component {
    render() {
        const {match,backgroundColor='#0E1B31'}=this.props;
        if(!match){
            return null
        }
        const {start, radiant, dire} = match;

        return (
            <FlexContainer justify='center'
                           style={{padding: '20px 0', color: '#fff', backgroundColor: backgroundColor}}>
                <Team team={radiant}/>

                <div style={{textAlign: 'center', margin: '0 20px'}}>
                    <div style={{fontSize: 28}}>VS</div>
                    <div style={{color: 'blue', border: '1px solid blue', borderRadius: 4}}>
                        {moment(start).format('MM-DD HH:mm')}
                    </div>
                </div>
                <Team team={dire}/>
            </FlexContainer>
        )
    }
}



export default Header
