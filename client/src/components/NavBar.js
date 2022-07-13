import {
    NavLink,
    Link,
    useLocation,
    matchPath
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../state/reducer/userReducer";

import {
    Tabs,
    Tab
} from '@mui/material'

const NavBar = () => {
    const { isLoggedIn, homeUserName } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log('Hitting Logout');
        await dispatch(logout());
    }

    const giveRoutes = () => [
        isLoggedIn ? `user/:userName` : '',
        `user/:userName/game/new`
    ]

    const useRouteMatch = (patterns) => {
        const { pathname } = useLocation();
        for (let i = 0; i < patterns.length; i += 1) {
            const pattern = patterns[i];
            const possibleMatch = matchPath(pattern, pathname);
            if (possibleMatch !== null) {
                return possibleMatch;
            }
        }
        return null;
    }

    // return (
    //     <nav className="row">
    //         <div className="col">
    //             <NavLink to={isLoggedIn ? `user/${homeUserName}` : ''} end className='btn btn-success'>Home</NavLink>
    //             {
    //                 isLoggedIn ? 
    //                 <>
    //                     <NavLink to={`user/${homeUserName}/new`} end className='btn btn-success'>Create New Game Idea</NavLink>
    //                 </> : ''
    //             }
    //         </div>
    //         {isLoggedIn ? 
    //             <div className="col-2">
    //                 <button onClick={(e) => handleLogout(e)} className='btn btn-danger float-end'>Logout</button>
    //             </div> : ''}
    //     </nav>
    // );
    const routeMatch = useRouteMatch(giveRoutes());
    const currentTab = routeMatch?.pattern?.path;

    return (
        <Tabs value={currentTab}>
            <div className="col">
                <Tab label='Home' value={isLoggedIn ? `user/:userName` : ''} to={`user/${homeUserName}`} component={Link}/>
                {
                    isLoggedIn ? 
                    <>
                        <Tab label='Create New Game Idea' value={`user/:userName/new`} to={`user/${homeUserName}/new`} component={Link} />
                    </> : ''
                }
            </div>
            {isLoggedIn ? <Tab className="col-2" label='Logout' onClick={(e) => handleLogout(e)} /> : ''}
        </Tabs>
    );
}

export default NavBar;