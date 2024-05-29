const express = require("express");
const authenticationMid = require("../middleware/auth");
const { getUsers, getUser } = require("../controllers/user");
const { getReservations } = require("../controllers/reservation");

const router = express.Router();

router.get("/kayitgiris", authenticationMid, (req, res) => {
  res.render("succeslogin");
});

router.use("/planlar", authenticationMid, (req, res) => {
  res.render("plans");
});

router.use("/profile", authenticationMid, async(req, res) => {
  const userReservation = await getReservations(req.cookies.token);
  res.render("profile",{userReservation});
});

router.use("/admin/dashboard", authenticationMid, async (req, res) => {
  const users = await getUsers();
  res.render("dashboard", { users });
});

router.use("/admin/:id", authenticationMid, async (req, res)=>{
  const userID = req.params.id;
  const userReservations = await getReservations(userID);
  const user = await getUser(userID);
  res.render("admin-dash", {
    get_user: user,
    get_reserve: userReservations
  });
})

router.use("/giris", authenticationMid, (req, res) => {
  res.render("login");
});

router.use("/kayit", authenticationMid, (req, res) => {
  res.render("register");
});

router.use("/rezervasyon", authenticationMid, (req, res) => {
  res.render("rezervasyon");
});

router.use("/", authenticationMid, (req, res) => {
  res.render("index");
});

module.exports = router;
