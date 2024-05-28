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
        data: date,
        time: time,
        sport: sport,
      },
    });
    if (reservationControl === null) {
      const newReservation = await Reservation.create({
        data: date,
        time: time,
        sport: sport,
        userId: userID,
      });
    } else {
      res.status(400).send("rezervasyon dolu");
    }

    res.status(200).send("basarılı");
  } catch (error) {
    console.error(error);
    res.status(500).send("sg basarısız");
  }
};

module.exports = createRezervation;
