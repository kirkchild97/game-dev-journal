const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3
    },
    lastName : {
        type : String,
        required : true,
        minLength : 3
    },
    email : {
        type : String,
        unique : true
    },
    userName : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        minLength : 8
    },
    createdAt : {
        type : Date,
        default : new Date(),
        immutable : true
    },
    updatedAt : {
        type : Date,
        default : new Date()
    }
});

module.exports = model('users', userSchema);