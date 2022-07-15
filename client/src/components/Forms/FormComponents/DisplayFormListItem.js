import {
    ListItem
} from "@mui/material";
import {
    Delete
} from '@mui/icons-material'

const DisplayFormListItem = ({itemName, listName, removeItem}) => {

    const removeThisItem = (e) => {
        e.preventDefault();
        console.log('Hitting btn');
        removeItem({itemName, listName});
    }
    
    return (
        <ListItem>
            {itemName}
            {/* <p onClick={(e) => removeThisItem(e)} className="btn btn-danger">X</p> */}
            <Delete onClick={(e) => removeThisItem(e)} />
        </ListItem>
    );
}

export default DisplayFormListItem;