const e = require("express");
const Reservation = require("../models/reservations");

const createRezervation = async (req, res) => {
  const { sport, date, time } = req.body;
  const userID = req.cookies.token;
  const isAuth = req.cookies.isAuth;

  if (isAuth) {
    if (userID) {
    } else {
      return res.status(500);
    }
  } else {
    return res.status(500);
  }

  try {
    const reservationControl = await Reservation.findOne({
      where: {
        date: date,
        time: time,
        sport: sport,
      },
    });
    if (reservationControl === null) {
      const newReservation = await Reservation.create({
        date: date,
        time: time,
        sport: sport,
        userId: userID,
      });
    } else {
      res.status(400).send("rezervasyon dolu");
    }

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("sg basarısız");
  }
};

// const getReservations = async (req, res, next) => {
//   const userID = req.cookies.token;

//   const reservations = await Reservation.findAll({
//     where: {
//       userId: userID,
//     },
//   });
//   //! PROF. DR. SENİOR PREMİUM ULTRA DOĞUKAN SEKS COPYRİGHT 2024
//   //! MUMBAR SURAT BUNA ALLAHINI YERİM DİYOR
//   reservations.forEach((e)=>{
//    var sport = e.dataValues.sport;
//    console.log("Spor türü ", sport);
//   })
//   //console.log(reservations);
//   next();
// };

const getReservations = async (token) => {
  const reservations = await Reservation.findAll({
    where: {
      userId: token,
    },
    attributes: ["id", "date", "time", "sport", "createdAt"],
  });
  const reservationData = reservations.map((reservation) => reservation.dataValues);
  return reservationData;
};

module.exports = { createRezervation, getReservations };
