const express = require("express");
const { createRezervation } = require("../controllers/reservation");
const router = express.Router();

router.post("/createreservation", createRezervation);

module.exports = router;
