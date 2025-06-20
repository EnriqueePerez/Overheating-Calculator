import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../assets/styles/App.scss';
import { AuthCheck, AuthProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
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

const AuthWrapper = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return (
    <AuthProvider sdk={auth}>
      {children}
    </AuthProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthWrapper>
      <AuthCheck fallback={<Login />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/overheating' element={<OverStores />} />
          <Route
            path='/overheating/units/:storecr/:store'
            element={<OverUnits />}
          />
          <Route
            path='/overheating/unitnumber/:storecr/:store/:unit'
            element={<OverUnitNumber />}
          />
          <Route
            path='/overheating/refrigerant/:storecr/:store/:unitnumber/:unit'
            element={<OverRefrigerant />}
          />
          <Route
            path='/overheating/main/:refrigerant/:unit/:unitnumber/:storecr/:store'
            element={<OverMain />}
          />
          <Route path='/operation' element={<OperationStores />} />
          <Route
            path='/operation/units/:storecr/:store'
            element={<OperationUnits />}
          />
          <Route
            path='/operation/unitnumber/:storecr/:store/:unit'
            element={<OperationUnitNumber />}
          />
          <Route
            path='/operation/main/:unit/:unitnumber/:storecr/:store'
            element={<OperationMain />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/changePass' element={<ChangePass />} />
        </Routes>
      </AuthCheck>
    </AuthWrapper>
  </BrowserRouter>
);

export default App;
