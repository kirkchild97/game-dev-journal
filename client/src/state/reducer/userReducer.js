import { createSlice } from "@reduxjs/toolkit";

import {
    tryLoginUser,
    tryRegisterUser
} from "../actions/userActions";

const initialState = {
    isLoggedIn : false,
    homeUserName : ''
}

const userReducer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logout(state){
            state.isLoggedIn = false;
            state.homeUserName = '';
            localStorage.clear();
        }
    },
    extraReducers : {
        [tryLoginUser.fulfilled] : (state, action) => {
            state.isLoggedIn = action.payload.success;
            state.homeUserName = action.payload.homeUserName;
            localStorage.setItem('token', action.payload.token);
        }
    }
});

export const { logout } = userReducer.actions;
export default userReducer.reducer;