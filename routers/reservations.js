const createRezervation = require("../controllers/reservation");
const express = require("express");
const router = express.Router();

router.post("/createreservation", createRezervation);

module.exports = router;
