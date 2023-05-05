require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
