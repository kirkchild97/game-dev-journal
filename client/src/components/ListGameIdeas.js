import { useEffect } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useParams
} from 'react-router-dom';
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

import GameIdeaListItem from "./GameIdeaListItem";

import {
    getGameIdeas,
    deleteSelectedGames
} from "../state/actions/gameIdeaActions";

const ListGameIdeas = () => {
    const dispatch = useDispatch();
    const { userName } = useParams();
    const { gameIdeas } = useSelector(state => state.gameIdea);
    const [gameList, setGameList] = useState({});
    const [displayRows, setDisplayRows] = useState([]);

    const columns = [
        { field: 'name', headerName : 'Name', width : 200},
        { field: 'gameLoop', headerName : 'Game Loop', width : 200},
        { field: 'actions', headerName : 'Actions', width : 172}
    ]
    const rows = () => gameIdeas.map(game => ({id : game._id, name : game.name, gameLoop : game.gameLoop, actions : (<button>Test</button>)}));

    const updateGameList = (gameId, value) => {
        console.log('Hitting Update List Display');
        const setList = {};
        setList[gameId] = value;
        console.log(setList);
        setGameList({...gameList, ...setList});
    }

    const displayList = () => {
        return gameIdeas.map(game => <GameIdeaListItem updateGameList={updateGameList} gameData={game} key={game._id}/>);
    }

    const isAnySelected = () => Object.keys(gameList).filter(id => gameList[id]).length;

    const setupList = () => {
        const setList = {};
        gameIdeas.forEach(game => {
            setList[game._id] = gameList[game._id] || false;
        });
        console.log(setList);
        return setGameList(setList);
    }

    const handleDeleteRequest = async (e) => {
        const confirmDelete = window.confirm('Are you sure you want to delete these game ideas?');
        if(confirmDelete){
            const sendList = Object.keys(gameList).filter(i => gameList[i]);
            console.log(sendList);
            dispatch(deleteSelectedGames({userName ,gameList : sendList}));
        }
    }

    useEffect(() => {
        dispatch(getGameIdeas({userName}));
    }, []);
    useEffect(() => {
        setupList();
        // setDisplayRows(rows());
    }, [gameIdeas]);
    
    return (
    <div style={{ height: 400, width: '100%' }}>
        {isAnySelected() ? <button onClick={(e) => handleDeleteRequest(e)} className="btn btn-danger">Delete</button> : ''}
        {/* <table className="table table-info table-striped border border-3 border-dark">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th className="border-start border-end border-dark">Game Loop</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {displayList()}
            </tbody>
        </table> */}
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={1}></TableCell>
                    <TableCell align="center" colSpan={1}>Name</TableCell>
                    <TableCell align="center" colSpan={1}>Game Loop</TableCell>
                    <TableCell align="center" colSpan={1}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {displayList()}
            </TableBody>
        </Table>
        {/* <DataGrid
        rows={rows()}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        /> */}
    </div>
    );
}

export default ListGameIdeas;