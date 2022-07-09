import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName : '',
    isLoggedIn : false
}

const userReducer = createSlice({
    name : 'user',
    initialState,
    reducers : {

    }
});

export default userReducer.reducer;