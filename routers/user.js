const express = require('express');
const {register, login, logout} = require('../controllers/user');
const User = require("../models/user");
const authenticationMid = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get("/kayitgiris", (req, res)=>{
    res.render("succeslogin");
});

router.get("/profil/:id", async (req, res)=>{
    var userID = req.headers.cookie.split("=")[1];;
    const userLog = await User.findOne({where: {id: userID}});
    console.log(userLog.name);
    // res.render("profile", {
    //     name: userLog.name,
    //     email: userLog.email,
    // })
    // console.log(userLog.name);
})

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
