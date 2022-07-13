const express = require('express');
const router = express.Router();

const { authorizeToken } = require('../middleware/verifyToken');

const {
    createGameIdea,
    getAllUserGameIdeas,
    getGameIdeaById,
    updateGameIdeaById,
    deleteGameIdeaById
} = require('../controllers/gameIdea');

router.use(authorizeToken);

router.post('/new', createGameIdea);

router.get('', getAllUserGameIdeas);
router.get('/:gameId', getGameIdeaById);

router.put('/:gameId', updateGameIdeaById);

router.delete('/:gameId', deleteGameIdeaById);

module.exports = router;