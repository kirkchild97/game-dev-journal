import DisplayFormListItem from "./DisplayFormListItem";
import { List } from '@mui/material';

const DisplayFormList = ({list, listName, removeItem}) => {
    
    return (
        <List className="list-unstyled row">
            {list.map((item, index) => (<DisplayFormListItem itemName={item} listName={listName} removeItem={removeItem} key={`${item}${index}`} />))}
        </List>
    );
}

export default DisplayFormList;