import {
    useParams,
    useNavigate
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

import { deleteGameIdea } from "../state/actions/gameIdeaActions";

const GameIdeaListItem = ({gameData, updateGameList}) => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    
    const [isActive, setIsActive] = useState(false);
    const {userName, gameId} = useParams();
    
    const setGameIdeaActive = (e) => {
        const { name } = e.target;
        switch(name){
            case 'editBtn':
                nav(`/user/${userName}/${gameData._id}/edit`);
                break;
            case 'deleteBtn':
                dispatch(deleteGameIdea({userName, gameId : gameData._id}));
                break;
            case gameData._id:
                setIsActive(!isActive);
                updateGameList(gameData._id, !isActive);
                break;
            default: 
                nav(`/user/${userName}/${gameData._id}`);
                break;
        }
        
        // console.log(name);
        // name === 'editBtn' ? nav(`/user/${userName}/${gameData._id}/edit`) : 
        // nav(`/user/${userName}/${gameData._id}`);
    }

    const rowSettings = () => gameId === gameData._id ? 'table-primary table-striped border-dark' : 'table-info table-striped border-dark';

    return (
        <tr className={rowSettings()} onClick={(e) => setGameIdeaActive(e)}>
            <td><input type="checkbox" value={isActive} name={gameData._id} id={gameData._id} /></td>
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