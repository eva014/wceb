/**
 * Created by Kael on 2017/3/2.
 */
import React from 'react'
import FlexContainer from "../../FlexContainer";

class Container extends React.Component {


    render() {
        const {view,backgroundColor='rgba(0,0,0,.4)'} = this.props;
        return (
            <div  style={{
                position: 'fixed',
                top: top,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: backgroundColor,
                height: '100%',
                zIndex: 102,
                overflow:'hidden',
            }}>
                <FlexContainer justify='center'
                               direction='column'
                               style={{width: "100%", height: '100%', backgroundColor: 'transparent'}}>
                    {
                        view
                    }
                </FlexContainer>

            </div>
        )
    }
}


export default Container
