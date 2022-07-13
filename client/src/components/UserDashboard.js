import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AddGameIdeaForm from "./Forms/AddGameIdeaForm";
import ListGameIdeas from "./ListGameIdeas";

const UserDashboard = () => {
    const { homeUserName } = useSelector(state => state.user);
    
    return (
        <div className="row">
            <h1>Welcome, {homeUserName}!!</h1>
            <div className="row">
                <div className="col">
                    <ListGameIdeas />
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;