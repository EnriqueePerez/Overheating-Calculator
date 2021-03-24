import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.scss';
import { AuthCheck } from 'reactfire';
import Home from '../containers/Home';
import Login from '../containers/Login';
import OverFirst from '../containers/OverFirst';
import OverSecond from '../containers/OverSecond';
import OverThird from '../containers/OverThird';
import OverFourth from '../containers/OverFourth';
import OverMain from '../containers/OverMain';
import OperationFirst from '../containers/OperationFirst';
import OperationSecond from '../containers/OperationSecond';
import OperationThird from '../containers/OperationThird';
import ChangePass from '../containers/ChangePass';
import OperationMain from '../containers/OperationMain';

const App = () => (
  <BrowserRouter>
    <AuthCheck fallback={<Login />}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/overheating' component={OverFirst} />
        <Route
          exact
          path='/overheating/unitnumber/:unit'
          component={OverSecond}
        />
        <Route
          exact
          path='/overheating/refrigerant/:unit/:unitnumber'
          component={OverThird}
        />
        <Route
          exact
          path='/overheating/stores/:refrigerant/:unit/:unitnumber'
          component={OverFourth}
        />
        <Route
          exact
          path='/overheating/main/:refrigerant/:unit/:unitnumber/:storecr/:store'
          component={OverMain}
        />
        <Route exact path='/operation' component={OperationFirst} />
        <Route
          exact
          path='/operation/unitnumber/:unit'
          component={OperationSecond}
        />
        <Route
          exact
          path='/operation/stores/:unit/:unitnumber'
          component={OperationThird}
        />
        <Route
          exact
          path='/operation/main/:unit/:unitnumber/:storecr/:store'
          component={OperationMain}
        />
        <Route exact path='/login' component={Login} />
        <Route exact path='/changePass' component={ChangePass} />
      </Switch>
    </AuthCheck>
  </BrowserRouter>
);

export default App;
