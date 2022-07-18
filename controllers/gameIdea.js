const GameIdea = require('../models/gameIdea');
const User = require('../models/user');
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createGameIdea = async (req, res) => {
    console.log('Hitting Create Game');
    try{
        // Validate User either here or with middleware
        const {
            middlewareUserId,
            name,
            genre,
            gameTags,
            gameLoop,
            inspirations,
            targetSystems,
            notes
        } = req.body;
        console.log(req.body);
        const user = await User.findOne({_id : middlewareUserId});
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
            await gameIdea.save(async (error, game) => {
                user.gameIdeas.push(game._id);
                await user.save();
                await console.log(game);
            });
            const token = jwt.sign({_id : middlewareUserId}, process.env.JWT_SECRET);
            return res.send(JSON.stringify({
                success : true,
                gameData : gameIdea,
                token
            }));
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
    console.log(req.body);
    try{
        const { middlewareUserId } = req.body;
        const user = await User.findOne({_id : middlewareUserId});
        const gameIdeas = await GameIdea.find({
            _id : {
                $in : user.gameIdeas
            }
        });
        const token = jwt.sign({_id : middlewareUserId}, process.env.JWT_SECRET);
        console.log('Found Games here');
        console.log(gameIdeas);
        return res.send(JSON.stringify({
            success : true,
            gameIdeas,
            token
        }));
    }catch(errors) {
        console.log(`Error Getting User Game Ideas ${errors}`);
        return res.send(JSON.stringify({
            success : false,
            errors
        }));
    }
}

exports.getGameIdeaById = async (req, res) => {
    console.log('Hitting Get Game By ID');
    try{
        const { middlewareUserId } = req.body;
        const { gameId } = req.params;
        const _id = Types.ObjectId(gameId);
        const gameIdea = await GameIdea.findOne({_id});
        if(gameIdea){
            return res.send(JSON.stringify({
                success : true,
                gameData : gameIdea
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
    try{
        const { middlewareUserId } = req.body;
        const user = await User.findOne({_id : middlewareUserId});
        const {
            // _id,
            name,
            genre,
            gameTags,
            gameLoop,
            inspirations,
            targetSystems,
            notes
        } = req.body;
        const validations = validateGameIdea({name, gameLoop});
        const _id = Types.ObjectId(req.params.gameId);
        if(true){
            console.log('User owns Game Idea, Continuing');
            console.log(validations);
            if(validations.isValid){
                // const gameIdea = await GameIdea.findOneAndUpdate({_id}, {
                //     name,
                //     genre,
                //     gameTags,
                //     gameLoop,
                //     inspirations,
                //     targetSystems,
                //     notes
                // };
                const gameIdea = await GameIdea.findOne({_id});
                gameIdea.overwrite({
                    name,
                    genre,
                    gameTags,
                    gameLoop,
                    inspirations,
                    targetSystems,
                    notes
                });

                console.log(gameIdea);
                
                const result = await gameIdea.save();
                return res.send(JSON.stringify({
                    success : true,
                    gameData : gameIdea
                }));
            }
        }
        return res.send(JSON.stringify({
            success : false,
            validations
        }));
    }catch(errors){
        console.log('Errors Updating Game Idea ' + errors);
        return res.send(JSON.stringify({
            success : false,
            errors
        }));
    }
}

exports.deleteGameIdeaById = async (req, res) => {
    console.log('Hitting Delete Game by ID');
    try{
        const { middlewareUserId } = req.body;
        const { gameIdeas } = await User.findOne({_id : middlewareUserId});
        const { gameId } = req.params;
        console.log(gameIdeas);
        console.log(gameId);
        if(gameIdeas.filter(item => Types.ObjectId(item) === Types.ObjectId(gameId))){
            console.log('Able to Delete');
            const _id = Types.ObjectId(gameId);
            // Ensure that the user is the owner of the game Idea with REACT implementation
            const deletedGame = await GameIdea.findByIdAndDelete(_id);
            return res.send(JSON.stringify({
                success : true,
                gameId
            }));
        }
        return res.send(JSON.stringify({success : false}));
    }catch(errors){
        console.log(`Error Deleting Game Idea: ${errors}`);
        return res.send(JSON.stringify({
            success : false,
            errors
        }));
    }
}

exports.deleteGameIdeaGroupById = async (req, res) => {
    console.log('Hitting Group delete');
    try{
        const { gameList, middlewareUserId } = req.body;
        const user = await User.findOne({_id : middlewareUserId});
        // const gameIdeas = await GameIdea.find({
        //     _id : {
        //         $in : gameIdeas
        //     }
        // });
        console.log(gameList);
        const checkUserOwner = gameList.filter(game => user.gameIdeas.includes(Types.ObjectId(game)));
        if(checkUserOwner){
            console.log('Can Delete Group');
            // const gameIdeas = await GameIdea.findByIdAndDelete({ $in : gameList });
            const gameIdeas = await GameIdea.deleteMany({
                _id : {
                    $in : gameList
                }
            });
            return res.send(JSON.stringify({
                success : true,
                gameList
            }));
        }
        return res.send(JSON.stringify({success : false}));
    }catch(errors) {
        console.log(`Error Deleting Game Idea Group: ${errors}`);
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

// exports.getUserGameIdeas = async () => {
//     const user = await User.findOne({_id});
//     const 
// }