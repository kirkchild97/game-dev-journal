import { useState } from 'react';

const AddGameIdeaForm = () => {
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

    const handleNoteChange = (e) => {
        const { name, value } = e.target;
        const setInput = {};
        setInput[name] = value;
        setNewNote({...inputs, setInput });
    }

    const submitNote = (e) => {
        if(newNote.description !== '') {
            setInputs({
                ...inputs,
                notes : [...inputs.notes, newNote]
            });
            setNewNote({
                title : '',
                description : ''
            });
        }
    }

    const submitListItem = () => {
        switch(activeInput){
            case 'gameTag':
                break;
            case 'inspiration':
                break;
            case 'targetSystem':
                break;
            case 'title' || 'description':
                break;
            case '':
                break;
        }
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
                console.log('Hitting basic');
                const setInput = {};
                setInput[name] = value;
                setInputs({...inputs, ...setInput });
                break;
        }
    }
    
    return (
        <form>
            <div>
                <label htmlFor="name">Name:</label>
                <input className='form-control' type="text" name="name" id="name" 
                onChange={(e) => handleChange(e)} value={inputs.name}  />
            </div>
            <div>
                <label htmlFor="genre">Genre:</label>
                <input className='form-control' type="text" name="genre" id="genre" 
                onChange={(e) => handleChange(e)} value={inputs.genre}  />
            </div>
            <div>
                <h2>Game Tags</h2>
                <label htmlFor="gameTag">Add Tag:</label>
                <input className='form-control' type="text" name="gameTag" id="gameTag" 
                onChange={(e) => handleChange(e)} value={gameTag} 
                onFocus={(e) => changeActiveList(e)} onBlur={(e) => changeActiveList({name:''})}  />
            </div>
            <div>
                <label htmlFor="gameLoop">Game Loop:</label>
                <input className='form-control' type="text" name="gameLoop" id="gameLoop" 
                onChange={(e) => handleChange(e)} value={inputs.gameLoop}  />
            </div>
            <div>
                <h2>Inspirations</h2>
                <label htmlFor="inspiration">Add Inspiration:</label>
                <input className='form-control' type="text" name="inspiration" id="inspiration" 
                onChange={(e) => handleChange(e)} value={inspiration}  />
            </div>
            <div>
                <h2>Target Systems</h2>
                <label htmlFor="targetSystem">Add Systems:</label>
                <input className='form-control' type="text" name="targetSystem" id="targetSystem" 
                onChange={(e) => handleChange(e)} value={targetSystem}  />
            </div>
            <div>
                <h2>Notes</h2>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input className='form-control' type="text" name="title" id="title" 
                    onChange={(e) => handleChange(e)} value={newNote.title}  />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input className='form-control' type="text" name="description" id="description" 
                    onChange={(e) => handleChange(e)} value={newNote.description}  />
                </div>
            </div>
        </form>
    )
}

export default AddGameIdeaForm;