import { useState } from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import { createGameIdeas } from '../../state/actions/gameIdeaActions';

import DisplayFormList from './FormComponents/DisplayFormList';
import DisplayNoteList from './FormComponents/DisplayFormNoteList';

const AddGameIdeaForm = () => {
    const dispatch = useDispatch();
    const { homeUserName } = useSelector(state => state.user);

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
                const gameData = {
                    name : inputs.name,
                    gameTags : inputs.gameTags,
                    genre : inputs.genre,
                    gameLoop : inputs.gameLoop,
                    inspirations : inputs.inspirations,
                    targetSystems : inputs.targetSystems,
                    notes : inputs.notes
                }
                const result = await dispatch(createGameIdeas({userName : homeUserName, gameData}));
                if(createGameIdeas.fulfilled.match(result) && result.payload.success){
                    // Clear Inputs of Navigate to new Page CLear for now
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
                else{
                    alert('Something went wrong creating the new game idea!! Please try again');
                }
            }
        }
    }
    
    return (
        <form className='card p-3' onSubmit={(e) => handleSubmit(e)}>
            <h2 className='h1'>Add New Game Idea!!</h2>
            <p className={inputs.name !== '' ? 'text-success' : 'text-danger'}>Name is required</p>
            <p className={inputs.gameLoop !== '' ? 'text-success' : 'text-danger'}>Game Loop is required</p>
            <div className='border-bottom border-dark py-3'>
                <label className='h2' htmlFor="name">Name:</label>
                <input className='form-control' type="text" name="name" id="name" 
                onChange={(e) => handleChange(e)} value={inputs.name}  />
            </div>
            <div className='border-bottom border-dark py-3'>
                <label className='h3' htmlFor="genre">Genre:</label>
                <input className='form-control' type="text" name="genre" id="genre" 
                onChange={(e) => handleChange(e)} value={inputs.genre}  />
            </div>
            <div className='border-bottom border-dark py-3'>
                <label className='h3 d-block'>Game Tags</label>
                <label className='h4' htmlFor="gameTag">Add Tag:</label>
                <input className='form-control' type="text" name="gameTag" id="gameTag" 
                onChange={(e) => handleChange(e)} value={gameTag} 
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                <DisplayFormList listName='gameTags' removeItem={removeListItem} list={inputs.gameTags} />
            </div>
            <div className='border-bottom border-dark py-3'>
                <label className='h3' htmlFor="gameLoop">Game Loop:</label>
                <input className='form-control' type="text" name="gameLoop" id="gameLoop" 
                onChange={(e) => handleChange(e)} value={inputs.gameLoop}  />
            </div>
            <div className='border-bottom border-dark py-3'>
                <label className='h3 d-block'>Inspirations</label>
                <label className='h4' htmlFor="inspiration">Add Inspiration:</label>
                <input className='form-control' type="text" name="inspiration" id="inspiration" 
                onChange={(e) => handleChange(e)} value={inspiration}
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                <DisplayFormList listName='inspirations' removeItem={removeListItem} list={inputs.inspirations} />
            </div>
            <div className='border-bottom border-dark py-3'>
                <label className='h3 d-block'>Target Systems</label>
                <label className='h4' htmlFor="targetSystem">Add Systems:</label>
                <input className='form-control' type="text" name="targetSystem" id="targetSystem" 
                onChange={(e) => handleChange(e)} value={targetSystem}
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                <DisplayFormList listName='targetSystems' removeItem={removeListItem} list={inputs.targetSystems} />
            </div>
            <div>
                <label className='h3'>Notes</label>
                <div>
                    <label className='h4' htmlFor="title">Title:</label>
                    <input className='form-control' type="text" name="title" id="title" 
                    onChange={(e) => handleChange(e)} value={newNote.title}
                    onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                </div>
                <div>
                    <label className='h4' htmlFor="description">Description:</label>
                    <input className='form-control' type="text" name="description" id="description" 
                    onChange={(e) => handleChange(e)} value={newNote.description}
                    onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({target : {name : ''}})}  />
                    <p onClick={(e) => submitNote()} className='btn btn-primary'>Add Note</p>
                    <DisplayNoteList list={inputs.notes} listName='notes' removeItem={removeNoteItem} />
                </div>
            </div>
            <input type="submit" className='btn btn-primary' value="CREATE GAME IDEA" />
        </form>
    )
}

export default AddGameIdeaForm;