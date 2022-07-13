import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getAllUserGameURL,
    createGameURL,
    updateGameIdeaURL
} from "../../constants/endpoints";

import {
    postHeader,
    getHeader,
    putHeader
} from '../../constants/fetchHeaders';

export const getGameIdeas = createAsyncThunk('getGameIdeas', async (data) => {
    try{
        const { userName } = data;
        const token = localStorage.getItem('token');
        const req = {
            method : 'GET',
            headers : getHeader(token)
        }
        const results = fetch(getAllUserGameURL({userName}), req)
            .then(res => res.json());
        return results
    }catch(error){
        console.log(`Error getting Game Ideas: ${error}`);
    }
});

export const createGameIdeas = createAsyncThunk('createGameIdea', async ({userName, gameData}) => {
    try{
        console.log(gameData);
        console.log(userName);
        const token = localStorage.getItem('token');
        const results = await fetch(createGameURL({userName}),{
            headers : postHeader(token),
            method : "POST",
            body : JSON.stringify({
                ...gameData
            })
        }).then(res => res.json());
        return results;
    }catch(e){console.log(`Error Sending Create Game Request: ${e}`);}
});

export const updateGameIdeas = createAsyncThunk('updateGameIdea', async ({userName, gameData}) => {
    try{
        console.log('Hitting Update Game Idea Action');
        const token = localStorage.getItem('token');
        const req = {
            headers : putHeader(token),
            method : 'PUT',
            body: JSON.stringify({
                ...gameData
            })
        }
        const gameId = gameData._id;
        const results = await fetch(updateGameIdeaURL({userName, gameId}), req)
            .then(res => res.json());
        return results;
    }catch(e){console.log(`Error Sending Update to Server: ${e}`);}
})

export const deleteGameIdea = createAsyncThunk('deleteGameIdea', async ({userName, gameId}) => {
    
})