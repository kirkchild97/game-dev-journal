const { Schema, model } = require('mongoose');

const gameIdeaSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : false,
        default : ''
    },
    gameTags : {
        type : [String],
        required : false,
        default : []
    },
    gameLoop : {
        type : String,
        required : true,
        minLength : 8
    },
    inspirations : {
        type : [String],
        required : false,
        default : []
    },
    targetSystems : {
        type : [String],
        required : false,
        default : []
    },
    notes : {
        type : [{
            title : {
                type : String,
                required : false,
                default : ''
            },
            description : {
                type : String,
                required : true
            }
        }],
        required : false,
        default : []
    }
});

module.exports = model('gameIdeas', gameIdeaSchema);