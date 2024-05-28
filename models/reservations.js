const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reservation = sequelize.define("reservations", {
  reservation_data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reservation_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Reservation;