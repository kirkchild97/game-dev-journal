import { createSlice } from "@reduxjs/toolkit";

import {
    getGameIdeas
} from '../actions/gameIdeaActions';

const initialState = {
    gameIdeas : []
}

const gameIdeaReducer = createSlice({
    name : 'gameIdea',
    initialState,
    reducers : {

    },
    extraReducers : {
        [getGameIdeas.fulfilled] : (state, action) => {
            console.log(action.payload);
            const { success, gameIdeas } = action.payload;
            state.gameIdeas = success ? gameIdeas : [];
        }
    }
});

export default gameIdeaReducer.reducer;