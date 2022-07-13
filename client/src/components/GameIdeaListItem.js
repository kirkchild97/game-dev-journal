import {
    useParams,
    useNavigate
} from "react-router-dom";

const GameIdeaListItem = ({gameData}) => {
    const nav = useNavigate();
    
    const {userName, gameId} = useParams();
    
    const setGameIdeaActive = () => {
        nav(`/user/${userName}/${gameData._id}`);
    }

    const rowSettings = gameId === gameData._id ? 'table-primary' : '';

    return (
        <tr className="" onClick={() => setGameIdeaActive()}>
            <td className="p-1">{gameData.name}</td>
            <td className="border-start border-end border-dark">{gameData.gameLoop}</td>
            <td className="p-1">
                <button className="btn btn-danger">Delete</button>
                <button className="btn btn-info">Edit</button>
            </td>
        </tr>
    );
}

export default GameIdeaListItem;