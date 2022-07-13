import { Outlet, Navigate } from 'react-router-dom';
import {
    useSelector
} from 'react-redux';

const PublicRoutes = ({ redirectTo, data}) => {
    console.log(redirectTo);
    const { isLoggedIn, homeUserName } = useSelector(state => state.user);
    return (isLoggedIn ? <Navigate to={ redirectTo } /> : <Outlet data={ data } />)
}

export default PublicRoutes;