const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 8080;

const MONGOURI = process.env.MONGO_URI; 

// Routers
const authRoutes = require('./router/authRoutes');
const gameRoutes = require('./router/gameIdeaRoutes');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(authRoutes);
app.use('/:username/game', gameRoutes);

mongoose.connect(MONGOURI, () => {
    console.log('Database Connected Successfully. Starting Server');
    app.listen(PORT, () => {
        console.log(`Server Running on PORT: ${PORT}.`);
    })
})