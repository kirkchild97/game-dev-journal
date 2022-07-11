import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useSelector } from 'react-redux';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import LoginAndRegisterPage from '../loginAndRegisterPage';
import NavBar from '../components/NavBar';
import UserDashboard from '../components/UserDashboard';

const AppRouter = () => {
  const { homeUserName } = useSelector(state => state.user);
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='' redirectTo={`/${homeUserName}`} element={<PublicRoutes />}>
          <Route exact path='' element={<LoginAndRegisterPage />} />
        </Route>
        <Route path='/:username' element={<PrivateRoutes />}>
          <Route exact path='' element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;