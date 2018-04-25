import React from 'react';
import {Drawer} from 'antd-mobile';
import FixedComponent from "../../../common/FixedComponent/FixedComponent";
import {MAIN_BACKGROUNDCOLOR} from "../../../util/color";
import Header from "./Header";
import HomeContainer from "../../User/Home/container/Container";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'app',
            open: false,
        };
    }


    render() {
        console.log(this.props.route, this.props.params, this.props.routeParams);

        return (
            <div className="container" style={{backgroundColor: MAIN_BACKGROUNDCOLOR}}>
                <Drawer
                    style={{position: 'fixed', height: '100%', zIndex: 101}}
                    position="left"
                    sidebar={<div>
                        <div style={{height: 60}}/>
                        <HomeContainer/>
                    </div>}
                    sidebarStyle={{backgroundColor: MAIN_BACKGROUNDCOLOR, width: 100}}
                    contentStyle={{paddingTop: 45,}}
                    open={this.state.open}
                    onOpenChange={() => this.setState({open: !this.state.open})}
                >
                    <FixedComponent style={{top: 0, zIndex: 1}}>
                        <Header location={this.props.location} leftClick={() => {
                            this.setState({open: true})
                        }}/>
                    </FixedComponent>
                    {
                        this.props && this.props.children
                        && React.cloneElement(this.props.children, {
                            changeTitle: title => this.setState({title}),
                        }) || 'no content'}
                </Drawer>
            </div>
        );
    }
}
