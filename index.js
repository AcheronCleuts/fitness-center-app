const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routers/user");
const auth = require("./routers/auth");
const rezervationsRouter = require("./routers/reservations");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const Reservation = require("./models/reservations");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

app.use(auth);
app.use(rezervationsRouter);
app.use(user);

app.use("/", (req, res) => {
  res.render("index");
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
