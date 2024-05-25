const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fitnessapp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;