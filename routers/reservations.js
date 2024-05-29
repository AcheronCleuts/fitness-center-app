const express = require("express");
const { createRezervation, deleteReservation } = require("../controllers/reservation");
const router = express.Router();

router.post("/createreservation", createRezervation);
router.post("/deletereservation", deleteReservation)

module.exports = router;
