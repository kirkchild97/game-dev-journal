import {
    configureStore,
    combineReducers
} from "@reduxjs/toolkit";

import userReducer from "../reducer/userReducer";
import gameIdeaReducer from "../reducer/gameIdeaReducer";

export const store = configureStore({
    reducer : {
        user : userReducer,
        gameIdea : gameIdeaReducer
    }
});