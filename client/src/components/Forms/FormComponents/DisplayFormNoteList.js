import DisplayNoteListItem from "./DisplayFormNameListItem";

const DisplayNoteList = ({list, listName, removeItem}) => {
    return (
        <ul className="list-unstyled">
            {list.map((item, index) => (<DisplayNoteListItem itemData={item} listName={listName} removeItem={removeItem} key={`${item}${index}`} />))}
        </ul>
    );
}

export default DisplayNoteList;