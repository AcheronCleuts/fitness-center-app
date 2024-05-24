const express = require("express");
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.listen(process.env.PORT, ()=>{
    console.log("Sunucu aktif");
})