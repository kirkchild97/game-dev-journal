import { useEffect } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useParams
} from 'react-router-dom';

import GameIdeaListItem from "./GameIdeaListItem";

import { getGameIdeas } from "../state/actions/gameIdeaActions";

const ListGameIdeas = () => {
    const dispatch = useDispatch();
    const { userName } = useParams();
    const { gameIdeas } = useSelector(state => state.gameIdea);

    useEffect(() => {
        const results = dispatch(getGameIdeas({userName}));
    }, []);
    
    return (
        <table className="table table-info table-striped border border-3 border-dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="border-start border-end border-dark">Game Loop</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {gameIdeas.map(game => <GameIdeaListItem gameData={game} key={game._id}/>)}
            </tbody>
        </table>
    );
}

export default ListGameIdeas;