const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser
} = require('../controllers/authorization');

router.post('/registration', registerUser);
router.post('/login', loginUser);

module.exports = router;