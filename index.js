const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routers/user");
const auth = require("./routers/auth");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(auth);
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
