const express = require('express');
const authenticationMid = require('../middleware/auth');
const { getReservations } = require('../controllers/reservation');

const router = express.Router();

router.get("/kayitgiris",authenticationMid, (req, res)=>{
    res.render("succeslogin");
});

router.use("/planlar",authenticationMid, (req, res)=>{
    res.render("plans");
})

router.use("/profile",authenticationMid,getReservations, (req, res)=>{
    res.render("profile");
})

router.use("/admin/dashboard", authenticationMid, (req, res)=>{
    res.render("dashboard");
})

router.use("/giris",authenticationMid, (req, res)=>{
    res.render("login");
})

router.use("/kayit",authenticationMid, (req, res)=>{
    res.render("register");
})

router.use("/rezervasyon",authenticationMid, (req, res)=>{
    res.render("rezervasyon");
})

router.use("/",authenticationMid, (req, res) => {
    res.render("index");
});

module.exports = router;
