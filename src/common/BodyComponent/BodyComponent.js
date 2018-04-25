/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'

class BodyComponent  extends React.Component {
    render() {
        const {style = {}} = this.props;
        return (
            <div
                 style={{
                     position: 'relative',
                     height:'100%',
                     paddingTop:45,
                     ...style
                 }}>
                {this.props.children}
            </div>
        )
    }
}


export default BodyComponent
