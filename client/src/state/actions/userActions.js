import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
    registerURL,
    loginURL,
    createGameURL
} from "../../constants/endpoints";
import {
    basePost
} from '../../constants/fetchHeaders'

export const tryRegisterUser = createAsyncThunk('registerUser', async (data) => {
    console.log('Hitting Register User Action');
    try{
        const req = {
            method : 'POST',
            headers : basePost(),
            body : JSON.stringify(data)
        }
        const result = await fetch(registerURL(), req)
            .then(res => res.json())
            .catch(e => console.log(`Error trying to Register: ${e}`));
        console.log(`Got Results`);
        console.log(result);
        return result;
    }catch(e){console.log(`Error trying to execute register action: ${e}`);}
});

export const tryLoginUser = createAsyncThunk('loginUser', async (data) => {
    console.log('Hitting Login Action');
    try{
        const req = {
            method : 'POST',
            headers : basePost(),
            body : JSON.stringify(data)
        }
        const result = await sendRequest({url : loginURL(), req});
        console.log('Results Are');
        console.log(result);
        return result
    }catch(e){console.log(`Error Sending Login Request: ${e}`)}
});

export const confirmToken = createAsyncThunk('confirmToken', (data) => {

});

const sendRequest = async({url, req}) => {
    const result = await fetch(url, req)
        .then(res => res.json())
        .catch(e => console.log(`Error sending Request ${e}`));
    return result;
}