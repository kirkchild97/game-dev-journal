import {
    useState,
    useEffect
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    useParams,
    useNavigate
} from 'react-router-dom';
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
    CardHeader,
    CardContent,
    TextField,
    Typography
} from '@mui/material';

import {
    createGameIdeas,
    updateGameIdeas
} from '../../state/actions/gameIdeaActions';

import DisplayFormList from './FormComponents/DisplayFormList';
import DisplayNoteList from './FormComponents/DisplayFormNoteList';

const AddGameIdeaForm = () => {
    const nav = useNavigate();
    
    const { userName, gameId } = useParams();
    const dispatch = useDispatch();
    const { homeUserName } = useSelector(state => state.user);
    const { gameIdeas } = useSelector(state => state.gameIdea);

    // const editGame = gameId ? gameIdeas.filter(item => item._id === gameId)[0] : false;
    
    // Check for changes to address to account for going from Edit to Create New
    
    const isEditing = () => gameId !== undefined;
    
    const [inputs, setInputs] = useState({
        name : '',
        genre : '',
        gameTags : [],
        gameLoop : '',
        inspirations : [],
        targetSystems : [],
        notes : []
    });
    const [newNote, setNewNote] = useState({
        title : '',
        description : ''
    });
    const [gameTag, setGameTag] = useState('');
    const [inspiration, setInpspiration] = useState('');
    const [targetSystem, setTargetSystem] = useState('');
    const [activeInput, setActiveInput] = useState('');
    
    useEffect(() => {
        if(isEditing()){
            const existingGame = gameIdeas.filter(item => item._id === gameId)[0];
            setInputs(existingGame);
        }else{
            setInputs({
                name : '',
                genre : '',
                gameTags : [],
                gameLoop : '',
                inspirations : [],
                targetSystems : [],
                notes : []
            });
        }
        setNewNote({
            title : '',
            description : ''
        });
        setGameTag('');
        setInpspiration('');
        setTargetSystem('');
        setActiveInput('');
    }, [gameId]);

    const submitNote = () => {
        if(newNote.description !== '') {
            setInputs({
                ...inputs,
                notes : [...inputs.notes, {
                    title : newNote.title,
                    description : newNote.description
                }]
            });
            setNewNote({
                title : '',
                description : ''
            });
        }
    }

    const submitListItem = (e) => {
        e.preventDefault();
        console.log('HItting Submit List Item');
        switch(activeInput){
            case 'gameTag':
                if(gameTag !== ''){
                    setInputs({ ...inputs, gameTags : [...inputs.gameTags, gameTag]});
                }
                setGameTag('');
                break;
            case 'inspiration':
                if(inspiration !== ''){
                    setInputs({ ...inputs, inspirations : [...inputs.inspirations, inspiration]});
                }
                setInpspiration('');
                break;
            case 'targetSystem':
                if(targetSystem !== ''){
                    setInputs({ ...inputs, targetSystems : [...inputs.targetSystems, targetSystem]});
                }
                setTargetSystem('');
                break;
            case 'title' || 'description':
                submitNote();
                break;
            default:
                break;
        }
    }

    const removeListItem = ({itemName, listName}) => {
        console.log('Hitting' + itemName, listName);
        console.log(activeInput);
        if(activeInput === ''){
            const setList = [];
            setList[listName] = inputs[listName].filter(item => item !== itemName);
            setInputs({
                ...inputs,
                ...setList
            });
        }
        else{
        }
    }

    const removeNoteItem = ({itemNote, listName}) => {
        const setList = inputs.notes.filter(item => item.title !== itemNote.title && item.description !== itemNote.description);
        setInputs({
            ...inputs,
            notes : setList
        });
    }


    const changeActiveList = (e) => {
        setActiveInput(e.target.name);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case 'gameTag':
                setGameTag(value);
                break;
            case 'inspiration':
                setInpspiration(value);
                break;
            case 'targetSystem':
                setTargetSystem(value);
                break;
            case 'title':
                setNewNote({...newNote, title : value});
                break;
            case 'description':
                setNewNote({...newNote, description : value});
                break;
            default:
                const setInput = {};
                setInput[name] = value;
                setInputs({...inputs, ...setInput });
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(activeInput !== ''){
            submitListItem(e);
        }
        else{
            console.log('Validate and Submit Data!!');
            if(inputs.title !== '' && inputs.gameLoop !== ''){
                console.log('Able to be submitted');
                // Allow for Edit or Create
                const result = isEditing() ? await dispatch(updateGameIdeas({homeUserName, gameData : inputs})) :
                    await dispatch(createGameIdeas({userName : homeUserName, gameData : inputs}));
                if(createGameIdeas.fulfilled.match(result) || updateGameIdeas.fulfilled.match(result) && result.payload.success){
                    // Clear Inputs of Navigate to new Page CLear for now
                    nav(`/user/${homeUserName}`);
                }
                else{
                    alert('Something went wrong creating the new game idea!! Please try again');
                }
            }
        }
    }
    
    return (
        <form className='card p-3' onSubmit={(e) => handleSubmit(e)}>
            <CardHeader title={<h2>{isEditing() ? 'Edit' : 'Add New'} Game Idea!!</h2>} />
            <FormControl className='form-control my-2' >
                <InputLabel className='h2' htmlFor="name">Name:</InputLabel>
                <Input type="text" name="name" id="name" 
                onChange={(e) => handleChange(e)} value={inputs.name}  />
                <FormHelperText error={inputs.name === ''} >Name is required</FormHelperText>
            </FormControl>
            <FormControl className='form-control my-2'>
                <InputLabel className='h3' htmlFor="genre">Genre:</InputLabel>
                <Input type="text" name="genre" id="genre" 
                onChange={(e) => handleChange(e)} value={inputs.genre}  />
            </FormControl>
            <CardHeader title={<h3>Game Tags</h3>} />
            <FormControl title={<h3>Title</h3>} className='form-control'>
                {/* <label className='h3 d-block'>Game Tags</label> */}
                <InputLabel htmlFor="gameTag">Add Tag:</InputLabel>
                <Input type="text" name="gameTag" id="gameTag" 
                onChange={(e) => handleChange(e)} value={gameTag} 
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                <DisplayFormList listName='gameTags' removeItem={removeListItem} list={inputs.gameTags} />
            </FormControl>
            <FormControl className='form-control my-2'>
                <InputLabel htmlFor="gameLoop">Game Loop:</InputLabel>
                <Input type="text" name="gameLoop" id="gameLoop" 
                onChange={(e) => handleChange(e)} value={inputs.gameLoop}  />
                <FormHelperText error={inputs.gameLoop === ''} >Game Loop is required</FormHelperText>
            </FormControl>
            <CardHeader title={<h3>Inspirations</h3>} />
            <FormControl className='form-control my-2'>
                <InputLabel htmlFor="inspiration">Add Inspiration:</InputLabel>
                <Input type="text" name="inspiration" id="inspiration" 
                onChange={(e) => handleChange(e)} value={inspiration}
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                <DisplayFormList listName='inspirations' removeItem={removeListItem} list={inputs.inspirations} />
            </FormControl>
            <CardHeader title={<h3>Target Systems</h3>} />
            <FormControl className='form-control my-2'>
                <InputLabel htmlFor="targetSystem">Add Systems:</InputLabel>
                <Input type="text" name="targetSystem" id="targetSystem" 
                onChange={(e) => handleChange(e)} value={targetSystem}
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                <DisplayFormList listName='targetSystems' removeItem={removeListItem} list={inputs.targetSystems} />
            </FormControl>
            <CardHeader title={<h3>Notes</h3>} />
            <FormControl className='form-control my-2'>
                <FormControl className='form-control my-2'>
                    <InputLabel htmlFor="title">Title:</InputLabel>
                    <Input type="text" name="title" id="title" 
                    onChange={(e) => handleChange(e)} value={newNote.title}
                    onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                </FormControl>
                <FormControl className='form-control my-2'>
                    <TextField multiline rows={5} maxRows={5} name="description" id="description"
                    label='Description'
                    onChange={(e) => handleChange(e)} value={newNote.description}
                    onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                    <Typography variant='button' onClick={(e) => submitNote()} className='btn btn-primary my-3'>Add Note</Typography>
                    <DisplayNoteList list={inputs.notes} listName='notes' removeItem={removeNoteItem} />
                </FormControl>
            </FormControl>
            <Button size='large' type='submit' variant='outlined'>
                {isEditing() ? 'Submit Changes' : 'Create New Game Idea'}
            </Button>
        </form>
    )
}

export default AddGameIdeaForm; 