const express = require('express');
const router = express.Router();

const { register, login, getAllUsers, logout } = require('../controllers/controller.user.js');
// const isAuthenticated = require('../middleware/isAuthenticated.js');

router.post('/register', register);
router.post('/login', login);
router.get('/logout',logout);
router.get('/get-all-users', getAllUsers);

module.exports = router;