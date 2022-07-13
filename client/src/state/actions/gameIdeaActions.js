import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getAllUserGameURL,
    createGameURL,
    updateGameIdeaURL,
    deleteGameIdeaURL,
    deleteSelectedURL
} from "../../constants/endpoints";

import {
    postHeader,
    getHeader,
    putHeader,
    deleteHeader
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
    try{
        console.log('Hitting Delete Action');
        const token = localStorage.getItem('token');
        const req = {
            headers : deleteHeader(token),
            method : 'DELETE',
            body : JSON.stringify({
                userName,
                gameId
            })
        }
        const results = await fetch(deleteGameIdeaURL({userName, gameId}), req)
            .then(res => res.json());
        return results;
    }catch(e){console.log(`Error Sending Delete Request: ${e}`);}
})

export const deleteSelectedGames = createAsyncThunk('deleteSelectedGames', async ({userName, gameList}) => {
    try{
        console.log('Hitting Delete Select Action');
        const token = localStorage.getItem('token');
        console.log(gameList);
        const req = {
            headers : deleteHeader(token),
            method : 'DELETE',
            body : JSON.stringify({
                gameList
            })
        }
        const results = await fetch(deleteSelectedURL({userName}), req)
            .then(res => res.json());
        return results;
    }catch(e){console.log(`Error Sending Delete Request: ${e}`);}
});