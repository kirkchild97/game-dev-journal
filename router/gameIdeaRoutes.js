const express = require('express');

const router = express.Router();

const {
    createGameIdea,
    getAllGameIdeas,
    getGameIdeaById,
    updateGameIdeaById,
    deleteGameIdeaById
} = require('../controllers/gameIdea');

router.post('/new', createGameIdea);

router.get('/', getAllGameIdeas);
router.get('/:id', getGameIdeaById);

router.put('/:id', updateGameIdeaById);

router.delete('/:id', deleteGameIdeaById);

module.exports = router;