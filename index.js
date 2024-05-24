const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.set("view engine", "ejs")

app.use("/", (req, res)=>{
    res.render("index");
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Sunucu 3000 Portunda OK");
})