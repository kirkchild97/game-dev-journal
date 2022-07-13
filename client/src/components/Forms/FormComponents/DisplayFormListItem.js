const DisplayFormListItem = ({itemName, listName, removeItem}) => {

    const removeThisItem = (e) => {
        e.preventDefault();
        console.log('Hitting btn');
        removeItem({itemName, listName});
    }
    
    return (
        <li>
            {itemName}
            <p onClick={(e) => removeThisItem(e)} className="btn btn-danger">X</p>
        </li>
    );
}

export default DisplayFormListItem;