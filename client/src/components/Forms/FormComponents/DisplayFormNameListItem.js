import { Delete } from '@mui/icons-material';

const DisplayNoteListItem = ({itemData, listName, removeItem}) => {

    const removeNoteItem = (e) => {
        e.preventDefault();
        removeItem({itemNote : itemData, listName});
    }
    
    return (
        <li className='card p-3 my-1'>
            <div className='d-flex justify-content-between'>
                <h3>{itemData.title}</h3>
                <Delete onClick={(e) => removeNoteItem(e)} />
            </div>
            <p>{itemData.description}</p>
        </li>
    );
}

export default DisplayNoteListItem;