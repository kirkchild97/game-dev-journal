import { useSelector } from "react-redux";
import AddGameIdeaForm from "./Forms/AddGameIdeaForm";

const UserDashboard = () => {
    const { homeUserName } = useSelector(state => state.user);
    
    return (
        <div className="row">
            <h2>Welcome, {homeUserName}!!</h2>
            <div className="row">
                <div className="col">
                    <AddGameIdeaForm />
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;