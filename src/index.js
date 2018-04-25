import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import App from './components/App/container/App';
import HomeContainer from './components/User/Home/container/Container'
import MatchListContainer from "./components/User/MatchList/container/Container";
import MatchResultListContainer from "./components/User/MatchResultList/container/Container";

import MatchDetailContainer from "./components/User/MatchDetail/container/Container";
import OrderListContainer from "./components/User/OrderList/container/Container";
import OrderDetailContainer from "./components/User/OrderDetail/container/Container";

import './index.less';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeContainer} />
        <Route path='matchs' component={MatchListContainer}/>
        <Route path='matchresults' component={MatchResultListContainer}/>
        <Route path='matchdetail/:matchId' component={MatchDetailContainer}/>
        <Route path='orders' component={OrderListContainer}/>
        <Route path='orderdetail/:hash' component={OrderDetailContainer}/>
    </Route>
  </Router>
, document.getElementById('example'));

// ReactDOM.render(
//   <div className="body">
//     <h1>Stages list</h1>
//     <ul role="nav">
//       <li><h3>ListView + Carousel</h3></li>
//       <li><h3>Tabs + ...</h3></li>
//       <li><h3>Form + ...</h3></li>
//     </ul>
//     <App><Stage3 /></App>
//   </div>
// , document.getElementById('example'));
