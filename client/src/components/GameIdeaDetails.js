import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameIdeaDetails = () => {
    const { gameId } = useParams();
    const { gameIdeas } = useSelector(state => state.gameIdea);
    const [gameIdea, setGameIdea] = useState(null);

    const getGame = () => gameIdeas.filter(idea => idea._id === gameId)[0];
    // useEffect(() => {
    //     console.log('Running Details Tab');
    //     if(getGame){
    //         setGameIdea(getGame);
    //     }
    // }, [getGame])

    const listItems = (listName) => getGame()[listName].map(item => <li key={item}>{item}</li>);
    const listNotes = () => getGame().notes.map(note => <li key={note.title+note.description}>
        <h4>{note.title}</h4>
        <p>{note.description}</p>
    </li>)

    return getGame() ? (
        <div className="card p-3">
            <h2>{getGame().name}</h2>
            <div>
                <h3>Genre:</h3>
                <p>{getGame().genre}</p>
            </div>
            <div>
                <h3>Additional Tags: </h3>
                <ul>
                    {listItems('gameTags')}
                </ul>
            </div>
            <div>
                <h3>Core Game Loop:</h3>
                <p>{getGame().gameLoop}</p>
            </div>
            <div>
                <h3>Inspirations:</h3>
                <ul>
                    {listItems('inspirations')}
                </ul>
            </div>
            <div>
                <h3>Target Systems:</h3>
                <ul>
                    {listItems('targetSystems')}
                </ul>
            </div>
            <div>
                <h3>Additional Notes:</h3>
                <ul>
                    {listNotes()}
                </ul>
            </div>
        </div>
    ) : <div></div>;
}

export default GameIdeaDetails;