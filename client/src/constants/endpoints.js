const baseURL = 'http://localhost:8080/';

export const registerURL = () => `${baseURL}registration`;
export const loginURL = () => `${baseURL}login`;
export const verifyToken = () => `${baseURL}verify`;
export const createGameURL = ({userName}) => `${baseURL}${userName}/game/new`;
export const getAllUserGameURL = ({userName}) => `${baseURL}${userName}/game`;
export const getGameByIdURL = ({userName, gameId}) => `${baseURL}${userName}/game/${gameId}`;
export const updateGameIdeaURL = ({userName, gameId}) => `${baseURL}${userName}/game/${gameId}`;
export const deleteGameIdeaURL = ({userName, gameId}) => `${baseURL}${userName}/game/${gameId}`;
export const deleteSelectedURL = ({userName}) => `${baseURL}${userName}/game`;