const express = require('express');
const {register, login, logout} = require('../controllers/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.use("/planlar", (req, res)=>{
    res.render("plans");
})

router.use("/profile", (req, res)=>{
    res.render("profile");
})

router.use("/giris", (req, res)=>{
    res.render("login");
})

router.use("/kayit", (req, res)=>{
    res.render("register");
})

router.use("/", (req, res) => {
    res.render("index");
});

module.exports = router;
