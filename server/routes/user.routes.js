const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/auth', AuthMiddleware, UserController.checkAuth);

module.exports = router;
