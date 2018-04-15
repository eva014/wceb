/**
 * Created by Kael on 2018/4/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {} from 'antd-mobile'

class GameInfo extends React.Component {
    render() {
        const {game}=this.props;
        if(!game){
            return null
        }
        return (
            <div>
                {
                    Object.entries(game).map((dataItem,index)=>{
                        // console.log(dataItem);
                        return <div key={index} style={{color:'#fff'}}>
                            {
                                dataItem.join('------')
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {game}=state;
    return {game}
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo)
