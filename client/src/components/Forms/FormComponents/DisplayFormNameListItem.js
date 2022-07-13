const DisplayNoteListItem = ({itemData, listName, removeItem}) => {

    const removeNoteItem = (e) => {
        e.preventDefault();
        removeItem({itemNote : itemData, listName});
    }
    
    return (
        <li>
            <h3>{itemData.title}</h3>
            <p>{itemData.description}</p>
            <p className="btn btn-danger" onClick={(e) => removeNoteItem(e)}>Remove Note</p>
        </li>
    );
}

export default DisplayNoteListItem;