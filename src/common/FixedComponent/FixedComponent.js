/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'

class FixedComponent extends React.Component {
    render() {
        const {style = {},onClick} = this.props;
        return (
            <div onClick={onClick}
                 style={{
                     position: 'fixed',
                     zIndex: '100',
                     width: '100%',
                     left: '0',
                     ...style,
                 }}>
                {this.props.children}
            </div>
        )
    }
}


export default FixedComponent
