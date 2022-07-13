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

    const rowSettings = () => gameId === gameData._id ? 'table-primary table-striped border-dark' : 'table-info table-striped border-dark';

    return (
        <tr className={rowSettings()} onClick={(e) => setGameIdeaActive(e)}>
            <td className="text-break p-1">{gameData.name}</td>
            <td className="text-break border-start border-end border-dark">{gameData.gameLoop}</td>
            <td className="p-1">
                <button name='deleteBtn' className="btn btn-danger">Delete</button>
                <button name="editBtn" className="btn btn-info">Edit</button>
            </td>
        </tr>
    );
}

export default GameIdeaListItem;