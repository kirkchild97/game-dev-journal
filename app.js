const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;
const {
    MONGOUSER,
    MONGOPASSWORD
} = process.env;

const MONGOURI = `mongodb+srv://${MONGOUSER}:${MONGOPASSWORD}@game-dev-journal.ozbk2qw.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(MONGOURI, () => {
    console.log('Database Connected Successfully. Starting Server');
    app.listen(PORT, () => {
        console.log(`Server Running on PORT: ${PORT}.`);
    })
})