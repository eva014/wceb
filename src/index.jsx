import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import App from './components/App/container/App';
import HomeContainer from './components/User/Home/container/Container'
import MatchListContainer from "./components/User/MatchList/container/Container";
import MatchDetailContainer from "./components/User/MatchDetail/container/Container";
import OrderListContainer from "./components/User/OrderList/container/Container";
import OrderDetailContainer from "./components/User/OrderDetail/container/Container";
// import OpenGameContainer from "./components/Manage/OpenGame/container/Container";
// import SetUpGameContainer from "./components/Manage/SetGame/container/Container";
// import ManageHomeContainer from "./components/Manage/Home/container/Container";
// import CreateTeamContainer from "./components/Manage/CreateTeam/container/Container";
// import CreateGameContainer from "./components/Manage/CreateGame/container/Container";
// import GameListContainer from "./components/Manage/GameList/container/Container";
// import WalletHomeContainer from "./components/Wallet/home/container/Container";

import './index.less';

// {/*<Route path='opengame' component={OpenGameContainer}/>*/}
// {/*<Route path='manage/home' component={ManageHomeContainer}/>*/}
// {/*<Route path='manage/gamelist' component={GameListContainer}/>*/}
// {/*<Route path='manage/createteam' component={CreateTeamContainer}/>*/}
// {/*<Route path='manage/creategame' component={CreateGameContainer}/>*/}
// {/*<Route path='manage/setupgame/:matchId' component={SetUpGameContainer}/>*/}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeContainer} />
        <Route path='matchs' component={MatchListContainer}/>
        <Route path='matchdetail/:matchId' component={MatchDetailContainer}/>
        <Route path='orders' component={OrderListContainer}/>
        <Route path='orderdetail' component={OrderDetailContainer}/>
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
