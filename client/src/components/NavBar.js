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
                <NavLink to={isLoggedIn ? `user/${homeUserName}` : ''} end className='btn btn-success'>Home</NavLink>
                {
                    isLoggedIn ? 
                    <>
                        <NavLink to={`user/${homeUserName}/new`} end className='btn btn-success'>Create New Game Idea</NavLink>
                    </> : ''
                }
            </div>
            {isLoggedIn ? 
                <div className="col-2">
                    <button onClick={(e) => handleLogout(e)} className='btn btn-danger float-end'>Logout</button>
                </div> : ''}
        </nav>
    );
}

export default NavBar;