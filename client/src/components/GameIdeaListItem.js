import {
    useParams,
    useNavigate
} from "react-router-dom";

const GameIdeaListItem = ({gameData}) => {
    const nav = useNavigate();
    
    const {userName, gameId} = useParams();
    
    const setGameIdeaActive = (e) => {
        const { name } = e.target;
        console.log(name);
        name === 'editBtn' ? nav(`/user/${userName}/${gameData._id}/edit`) : 
        nav(`/user/${userName}/${gameData._id}`);
    }

    const setEditGameIdea = (e) => {
    }

    const rowSettings = gameId === gameData._id ? 'table-primary' : '';

    return (
        <tr className="" onClick={(e) => setGameIdeaActive(e)}>
            <td className="p-1">{gameData.name}</td>
            <td className="border-start border-end border-dark">{gameData.gameLoop}</td>
            <td className="p-1">
                <button name='deleteBtn' className="btn btn-danger">Delete</button>
                <button name="editBtn" className="btn btn-info">Edit</button>
            </td>
        </tr>
    );
}

export default GameIdeaListItem;