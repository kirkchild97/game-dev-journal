import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRouter = () => {
  return (
    <Router>
      { /* PUT NAVBAR HERE */ }
      <Routes>
        <Route exact path='' element={<PublicRoutes />}>
          
        </Route>
        <Route path='/:username' element={<PrivateRoutes />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;