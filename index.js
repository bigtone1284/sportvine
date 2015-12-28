// Express Boiler-Plate

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var request = require("request");
    
var port = process.env.PORT || 3000;
var app = express();

require('dotenv').load();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set("view options", {
  layout: false
});

app.use(express.static(__dirname + "/public"));