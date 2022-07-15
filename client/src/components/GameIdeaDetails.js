import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Accordion,
    Card,
    CardHeader,
    CardContent,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

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
    const listNotes = () => getGame().notes.map((note, index) => (
        <li key={note.title+note.description}>
        <CardHeader title={<h4>{note.title}</h4>} />
        <Typography>{note.description}</Typography>
        {index !== getGame().notes.length - 1 ? <hr/> : ''}
    </li>
    ))

    return getGame() ? (
        <Card className="card p-3">
            <CardHeader title={<h2>{getGame().name}</h2>} />
            <CardContent>
                <div>
                    <CardHeader title={<h3>Genre:<Typography variant="span">{getGame().genre}</Typography></h3>} />
                </div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Additional Tags</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {listItems('gameTags')}
                    </AccordionDetails>
                </Accordion>
                <div>
                    <CardHeader title={<h3>Core Game Loop:</h3>} />
                    <Typography>{getGame().gameLoop}</Typography>
                </div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Inspirations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {listItems('inspirations')}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Target Systems</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {listItems('targetSystems')}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Notes</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="list-unstyled">
                        {listNotes()}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    ) : <div></div>;
}

export default GameIdeaDetails;