/**
 * Created by Kael on 2018/3/20.
 */
import React from 'react'
import {FlexContainer} from "../../../common/FlexContainer";
import {web3} from "../../../util/web3/web3";
import {getAccount} from "../../../util/contract/util";
import {Icon} from "antd-mobile";


class Header extends React.Component {
    state = {
        balance: 0
    };

    componentDidMount =  () => {
        setTimeout(()=>{
            this.getBalance().then()
        },1000)
    };


    getBalance= async () => {
        const account = await getAccount();
        const balance = await web3.eth.getBalance(account);
        this.setState({
            balance: web3.utils.fromWei(balance, 'ether')
        })
    };

    render() {
        const {leftClick, location} = this.props;
        console.log(location.pathname);
        return (
            <FlexContainer style={{height: 45, backgroundColor: '#1A2537'}} justify='between'>
                <FlexContainer style={{backgroundColor: 'transparent', padding: '0 10px'}} onClick={() => {
                   history.back()
                }}>
                    <Icon type={'left'} color={'#fff'} size={'md'}/>
                    {/*<img src={require('../images/menu.png')} style={{width: 30, height: 30}}/>*/}
                </FlexContainer>
                <FlexContainer style={{backgroundColor: '#253041', padding: '0 20px 0 10px', height: 45}}>
                    <img src={''} style={{width: 30, height: 30}}/>
                    <div style={{color: '#fff', fontSize: 10, marginLeft: 10}}>
                        <div>钱包余额</div>
                        <div>{`${this.state.balance} eth`}</div>
                    </div>
                </FlexContainer>
            </FlexContainer>
        )
    }
}

export default Header
