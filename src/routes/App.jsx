import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.scss';
import { AuthCheck } from 'reactfire';
import Home from '../containers/Home';
import Login from '../containers/Login';
import OverUnits from '../containers/OverUnits';
import OverUnitNumber from '../containers/OverUnitNumber';
import OverRefrigerant from '../containers/OverRefrigerant';
import OverStores from '../containers/OverStores';
import OverMain from '../containers/OverMain';
import OperationUnits from '../containers/OperationUnits';
import OperationUnitNumber from '../containers/OperationUnitNumber';
import OperationStores from '../containers/OperationStores';
import ChangePass from '../containers/ChangePass';
import OperationMain from '../containers/OperationMain';

const App = () => (
  <BrowserRouter>
    <AuthCheck fallback={<Login />}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/overheating' component={OverStores} />
        <Route
          exact
          path='/overheating/units/:storecr/:store'
          component={OverUnits}
        />
        <Route
          exact
          path='/overheating/unitnumber/:storecr/:store/:unit'
          component={OverUnitNumber}
        />
        <Route
          exact
          path='/overheating/refrigerant/:storecr/:store/:unitnumber/:unit'
          component={OverRefrigerant}
        />
        <Route
          exact
          path='/overheating/main/:refrigerant/:unit/:unitnumber/:storecr/:store'
          component={OverMain}
        />
        <Route exact path='/operation' component={OperationStores} />
        <Route
          exact
          path='/operation/units/:storecr/:store'
          component={OperationUnits}
        />
        <Route
          exact
          path='/operation/unitnumber/:storecr/:store/:unit'
          component={OperationUnitNumber}
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
