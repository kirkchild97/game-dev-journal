import { createSlice } from "@reduxjs/toolkit";

import {
    getGameIdeas,
    createGameIdeas,
    updateGameIdeas,
    deleteGameIdea,
    deleteSelectedGames
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
        },
        [deleteGameIdea.fulfilled] : (state, action) => {
            const { success, gameId } = action.payload;
            success ? state.gameIdeas = state.gameIdeas.filter(item => item._id !== gameId) : console.log('Delete did not work');
        },
        [deleteSelectedGames.fulfilled] : (state, action) => {
            const { success, gameList } = action.payload;
            success ? state.gameIdeas = state.gameIdeas.filter(({_id}) => !gameList.includes(_id)) : console.log('Something Went Wrong');
        }
    }
});

export default gameIdeaReducer.reducer;