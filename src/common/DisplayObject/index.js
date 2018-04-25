/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'

class DisplayObject  extends React.Component {
    render() {
        const {data} = this.props;
        return (
            <div style={{border:'1px solid #fff',color:'#fff'}}>
                {
                    Object.entries(data).map((dataItem,index)=>{
                        return <div key={index}>
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


export default DisplayObject
