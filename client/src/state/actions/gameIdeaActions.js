import { createAsyncThunk } from "@reduxjs/toolkit";
import { isCompositeComponent } from "react-dom/test-utils";

import {
    getAllUserGameURL,
    createGameURL
} from "../../constants/endpoints";

import {
    postHeader,
    getHeader
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