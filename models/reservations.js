const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reservation = sequelize.define("reservations", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Reservation;