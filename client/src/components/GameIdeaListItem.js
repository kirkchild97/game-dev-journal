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
    TableBody,
    Button
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
    const displayGameLoop = () => {
        const give = gameData.gameLoop.split('');
        give.length = 30;
        return `${give.join('')}...`;
    }

    const rowSettings = () => gameId === gameData._id ? "rgba(139, 162, 252)" : '';


    // className={rowSettings()} onClick={(e) => setGameIdeaActive(e)}

    return (
        <TableRow sx={{backgroundColor : rowSettings()}} hover onClick={(e) => setGameIdeaActive(e)}>
            {/* <td><input type="checkbox" value={isActive} name={gameData._id} id={gameData._id} /></td> */}
            <TableCell><input type="checkbox" value={isActive} name={gameData._id} id={gameData._id} /></TableCell>
            <TableCell>{gameData.name}</TableCell>
            <TableCell>{displayGameLoop()}</TableCell>
            <TableCell>
                <Button name='deleteBtn' variant="contained" color="error">Delete</Button>
                <Button name="editBtn" variant="contained" color='primary'>Edit</Button>
            </TableCell>
        </TableRow>
    );
}

export default GameIdeaListItem;