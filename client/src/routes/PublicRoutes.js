import { Outlet, Navigate } from 'react-router-dom';
import {
    useSelector
} from 'react-redux';

const PublicRoutes = ({ redirectTo, data}) => {
    const { isLoggedIn, homeUserName } = useSelector(state => state.user);
    return (isLoggedIn ? <Navigate to={ homeUserName } /> : <Outlet data={ data } />)
}

export default PublicRoutes;