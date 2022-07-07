const GameIdea = require('../models/gameIdea');
const { Types } = require('mongoose');

exports.createGameIdea = async (req, res) => {
    console.log('Hitting Create Game');
    try{
        // Validate User either here or with middleware
        const {
            name,
            genre,
            gameTags,
            gameLoop,
            inspirations,
            targetSystems,
            notes
        } = req.body;
        console.log(req.body);
        const validations = await validateGameIdea({name, gameLoop});
        if(validations.isValid){
            const gameIdea = new GameIdea({
                name,
                genre,
                gameTags,
                gameLoop,
                inspirations,
                targetSystems,
                notes
            });
            console.log('Game Created! Saving Now.');
            await gameIdea.save();
            return res.send(JSON.stringify({
                success : true,
                gameIdea
            }))
        }
        return res.send(JSON.stringify({
            success : false,
            validations
        }))
    }catch(e){
        console.log(`Error Creating Game Idea: ${e}`);
        return res.send(JSON.stringify({
            success : false,
            error : e
        }));
    }
}

exports.getAllUserGameIdeas = async (req, res) => {
    console.log('Hitting Get All Games');
    res.send(JSON.stringify({debug : true}));
}

exports.getGameIdeaById = async (req, res) => {
    console.log('Hitting Get Game By ID');
    try{
        const { gameId } = req.params;
        const _id = Types.ObjectId(gameId);
        const gameIdea = await GameIdea.findOne({_id});
        if(gameIdea){
            return res.send(JSON.stringify({
                success : true,
                data : gameIdea
            }));
        }
        else{
            return res.send(JSON.stringify({
                success : false,
                errors : 'Invalid ID'
            }))
        }
    }catch(errors){
        console.log(`Error getting Game Idea: ${errors}`);
        return res.send(JSON.stringify({
            success : false,
            errors
        }))
    }
}

exports.updateGameIdeaById = async (req, res) => {
    console.log('Hitting Update Game By ID');
    res.send(JSON.stringify({debug : true}));
}

exports.deleteGameIdeaById = async (req, res) => {
    console.log('Hitting Delete Game by ID');
    try{
        const { gameId } = req.params;
        const _id = Types.ObjectId(gameId);
        // Ensure that the user is the owner of the game Idea with REACT implementation
        const deletedGame = await GameIdea.findByIdAndDelete(_id);
        return res.send(JSON.stringify({
            success : true
        }));
    }catch(errors){
        return res.send(JSON.stringify({
            success : false,
            errors
        }));
    }
}

const validateGameIdea = ({name, gameLoop}) => {
    const errors = {};
    let isValid = true;
    if(!name.length || name.length === 0){
        isValid = false;
        errors.name = { minLength : true };
    }
    if(!gameLoop.length || gameLoop.length < 8){
        isValid = false;
        errors.gameLoop = { minLength : true };
    }
    const validations = {
        isValid,
        errors
    }
    return validations;
}