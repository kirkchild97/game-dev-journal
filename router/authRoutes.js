const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser,
    validateToken
} = require('../controllers/authorization');

router.post('/registration', registerUser);
router.post('/login', loginUser);
router.post('/verify', validateToken);

module.exports = router;