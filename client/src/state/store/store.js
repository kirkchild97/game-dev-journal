import {
    configureStore,
    combineReducers
} from "@reduxjs/toolkit";

import userReducer from "../reducer/userReducer";

export const store = configureStore({
    reducer : {
        user : userReducer
    }
});