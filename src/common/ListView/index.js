/**
 * Created by Kael on 2017/10/11.
 */
import React from 'react'
import {ListView} from 'antd-mobile'
import './commonlistview.less'
/**
 * 获取滚动区域的高度
 * @returns {number}
 */
export const getDocumentHeight=()=>{
    const body = document.body,
        html = document.documentElement;

    return  Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );

};
/**
 * fake net work return
 * @param items
 */
export const createFakePromise = (items = []) => {
    return Promise.resolve({
        rc: 0,
        data: {
            hasMore: false,
            items: items ? items : [],
        }
    })
};

function MyBody(props) {
    const {color = 'transparent'} = props;
    return (
        <div style={{backgroundColor: color}}>
            {props.children}
        </div>
    );
}


class CommonListView extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            page: 0,
            items: [],
            hasMore: true,
            fetching: false,
            documentHeight: getDocumentHeight(),
            dataSource: dataSource.cloneWithRows([]),
            listTop: 0
        }
    }

    componentDidMount() {
        this.createDate();
        const {useBody = true} = this.props;
        if (!useBody) {
            const {commonlistviewcontainer} = this.refs;
            if (commonlistviewcontainer) {
                const listTopN = commonlistviewcontainer.getBoundingClientRect().top;
                this.setState({
                    listTop: listTopN
                }, null)
            }
        }

    }

    createDate() {
        const {requestData,itemsValueKey='items'} = this.props;
        if (requestData) {
            this.setState({
                fetching: true,
            });
            requestData({page: this.state.page}).then(res => {
                if (res.rc === 0) {
                    const {data} = res;
                    const {hasMore} = data;
                    const items=data[itemsValueKey]?data[itemsValueKey]:[];
                    this.setState({
                        hasMore,
                        items: this.state.items.concat(items),
                        page: this.state.page + 1,
                        fetching: false,
                    }, null)
                }
            })
        }
    }

    renderEmptyElement = (emptyText) => {
        return <div style={{textAlign: 'center'}}>
            <img src={require('./default_page.png')} style={{width: 190, margin: 'auto'}}/>
            <p style={{marginTop: '0.2rem', color: '#999', fontSize: "0.26rem"}}>{emptyText}</p>
        </div>
    };

    oRenderFooter = () => {
        const {needFooter = true, emptyText = '暂无数据', renderFooter} = this.props;
        const {hasMore, items = [], fetching} = this.state;
        if (needFooter) {
            if (renderFooter) {
                return renderFooter()
            }
            return (
                <div style={{padding: 15, textAlign: 'center'}}>
                    {hasMore === true ? (fetching ? '加载中...' : '加载更多') :
                        (items.length === 0 ? this.renderEmptyElement(emptyText) : '没有更多啦~')}
                </div>
            )
        }
        return null
    };

    render() {

        const {pageable = true, renderCell, renderHeader = null,renderSeparator=null, bodyCorlor, useBody = true} = this.props;
        const {items = [], hasMore, fetching} = this.state;

        return (
            <div className='commonlistview-container' ref={useBody ? '' : 'commonlistviewcontainer'}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(items)}
                    renderHeader={renderHeader}
                    renderFooter={this.oRenderFooter}
                    renderBodyComponent={() => <MyBody color={bodyCorlor}/>}
                    renderSeparator={renderSeparator}
                    renderRow={(rowData) => {
                        return renderCell(rowData)
                    }}
                    onEndReached={() => {
                        if (!pageable) {
                            return
                        }
                        if (hasMore === true && fetching === false) {
                            this.createDate()
                        }
                    }}
                    style={useBody ? null : {
                        height: this.state.documentHeight - this.state.listTop ,
                        overflow: 'auto',
                        // border: '1px solid #ddd',
                    }
                    }
                    useBodyScroll={useBody}
                    pageSize={4}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onEndReachedThreshold={10}
                />
            </div>

        )
    }
}

export default CommonListView
