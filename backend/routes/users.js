const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const userController = require('../controllers/user');

router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
