import { createSlice } from "@reduxjs/toolkit";

import {
    getGameIdeas,
    createGameIdeas,
    updateGameIdeas
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
        },
        [createGameIdeas.fulfilled] : (state, action) => {
            const { success, gameData } = action.payload;
            console.log('GAME DATA');
            console.log(gameData);
            success ? state.gameIdeas = [...state.gameIdeas, gameData] : console.log('Unable to Create Game Idea');
        },
        [updateGameIdeas.fulfilled] : (state, action) => {
            const { success, gameData } = action.payload;
            console.log(action.payload);
            success ? state.gameIdeas = state.gameIdeas.map(item => {
                const returnValue = item._id === gameData._id ? gameData : item;
                return returnValue;
            }) : console.log('Unable to Complete Update Request.');
        }
    }
});

export default gameIdeaReducer.reducer;