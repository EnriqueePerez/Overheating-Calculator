import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.scss';
// import Login from '../containers/Login';
import FirstChoice from '../containers/FirstChoice';
import SecondChoice from '../containers/SecondChoice';
import ThirdChoice from '../containers/ThirdChoice';
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
        path='/main/:refrigerant/:unit/:unitnumber'
        component={Main}
      />
    </Switch>
  </BrowserRouter>
);

export default App;
