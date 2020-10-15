import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.scss';
// import Login from '../containers/Login';
import FirstChoice from '../containers/FirstChoice';
import SecondChoice from '../containers/SecondChoice';
import ThirdChoice from '../containers/ThirdChoice';
import FourthChoice from '../containers/FourthChoice';
import Main from '../containers/Main';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={FirstChoice} />
      <Route exact path='/unitnumber/:unit' component={SecondChoice} />
      <Route
        exact
        path='/refrigerant/:unit/:unitnumber'
        component={ThirdChoice}
      />
      <Route
        exact
        path='/stores/:refrigerant/:unit/:unitnumber'
        component={FourthChoice}
      />
      <Route
        exact
        path='/main/:refrigerant/:unit/:unitnumber/:storecr/:store'
        component={Main}
      />
    </Switch>
  </BrowserRouter>
);

export default App;
