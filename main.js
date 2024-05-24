const express = require("express");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT, ()=>{
    console.log("Sunucu aktif");
})