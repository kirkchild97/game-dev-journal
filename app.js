const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 8080;

const MONGOURI = process.env.MONGO_URI; 

// Middleware
const authorizeToken = require('./middleware/verifyToken');

// Routers
const authRoutes = require('./router/authRoutes');
const gameRoutes = require('./router/gameIdeaRoutes');

app.use(cors({origin : 'http://localhost:3000'}));
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