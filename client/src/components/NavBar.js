import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../state/reducer/userReducer";

const NavBar = () => {
    const { isLoggedIn, homeUserName } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log('Hitting Logout');
        await dispatch(logout());
    }

    return (
        <nav className="row">
            <div className="col">
                <NavLink to={isLoggedIn ? homeUserName : ''} className='btn btn-success'>Home</NavLink>
            </div>
            {isLoggedIn ? 
                <div className="col-2">
                    <button onClick={(e) => handleLogout(e)} className='btn btn-danger float-end'>Logout</button>
                </div> : ''}
        </nav>
    );
}

export default NavBar;