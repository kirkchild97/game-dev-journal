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
import AddGameIdeaForm from '../components/Forms/AddGameIdeaForm';
import GameIdeaDetails from '../components/GameIdeaDetails';

const AppRouter = () => {
  const { homeUserName } = useSelector(state => state.user);

  const publicRedirect = `user/${homeUserName}`;
  const privateRedirect = `/`;
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='' element={<PublicRoutes redirectTo={publicRedirect} />}>
          <Route exact path='' element={<LoginAndRegisterPage />} />
        </Route>
        <Route path='/user' element={<PrivateRoutes redirectTo={privateRedirect} />}>
          <Route path=':userName' element={<UserDashboard />} >
            <Route path='new' element={<AddGameIdeaForm />} />
            <Route path=':gameId' element={<GameIdeaDetails />} />
            <Route path=':gameId/edit' element={<AddGameIdeaForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;