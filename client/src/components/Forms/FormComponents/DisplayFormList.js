import DisplayFormListItem from "./DisplayFormListItem";

const DisplayFormList = ({list, listName, removeItem}) => {
    
    return (
        <ul>
            {list.map((item, index) => (<DisplayFormListItem itemName={item} listName={listName} removeItem={removeItem} key={`${item}${index}`} />))}
        </ul>
    );
}

export default DisplayFormList;