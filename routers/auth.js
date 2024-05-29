const express = require('express');
const router = express.Router();

const {register, login, logout, changeMembership} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post("/setmembership",changeMembership)

module.exports = router;