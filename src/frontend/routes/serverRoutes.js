import FirstChoice from '../containers/FirstChoice';
import SecondChoice from '../containers/SecondChoice';
import ThirdChoice from '../containers/ThirdChoice';
import FourthChoice from '../containers/FourthChoice';
import Main from '../containers/Main';

const routes = [
  {
    exact: true,
    path: '/',
    component: FirstChoice,
  },
  {
    exact: true,
    path: '/unitnumber/:unit',
    component: SecondChoice,
  },
  {
    exact: true,
    path: '/refrigerant/:unit/:unitnumber',
    component: ThirdChoice,
  },
  {
    exact: true,
    path: '/stores/:refrigerant/:unit/:unitnumber',
    component: FourthChoice,
  },
  {
    exact: true,
    path: '/main/:refrigerant/:unit/:unitnumber/:storecr/:store',
    component: Main,
  },
];

export default routes;
