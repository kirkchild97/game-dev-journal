const express = require('express');

const router = express.Router();

const {
    createGameIdea,
    getAllUserGameIdeas,
    getGameIdeaById,
    updateGameIdeaById,
    deleteGameIdeaById
} = require('../controllers/gameIdea');

router.post('/new', createGameIdea);

router.get('', getAllUserGameIdeas);
router.get('/:gameId', getGameIdeaById);

router.put('/:gameId', updateGameIdeaById);

router.delete('/:gameId', deleteGameIdeaById);

module.exports = router;