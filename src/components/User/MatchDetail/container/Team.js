/**
 * Created by Kael on 2018/4/9.
 */
import React from 'react'
import FlexContainer from "../../../../common/FlexContainer";

class Team extends React.Component {
    render() {
        const {team}=this.props;
        if(!team){
            return null
        }
        const {name,avatar} = team;
        return <FlexContainer direction='column'>
            <img style={{width: 50, height: 50}} src={avatar}/>
            <div style={{marginTop: 4}}>{name}</div>
        </FlexContainer>
    }
}



export default Team
