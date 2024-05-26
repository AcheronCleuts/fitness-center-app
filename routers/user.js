const express = require('express');
const {register, login, logout} = require('../controllers/user');
const User = require("../models/user");
const authenticationMid = require('../middleware/auth');

const router = express.Router();

router.get("/kayitgiris",authenticationMid, (req, res)=>{
    res.render("succeslogin");
});

router.get("/profil/:id",authenticationMid, async (req, res)=>{
    var userID = req.cookies.token;
    const userLog = await User.findOne({where: {id: userID}});
    res.render("profile", {
        name: userLog.name,
        email: userLog.email,
        date: userLog.createdAt,
        isAuth: req.cookies.isAuth
    })
})

router.use("/planlar",authenticationMid, (req, res)=>{
    res.render("plans");
})

router.use("/profile",authenticationMid, (req, res)=>{
    res.render("profile");
})

router.use("/giris",authenticationMid, (req, res)=>{
    res.render("login");
})

router.use("/kayit",authenticationMid, (req, res)=>{
    res.render("register");
})

router.use("/",authenticationMid, (req, res) => {
    res.render("index");
});

module.exports = router;
