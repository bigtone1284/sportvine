// Express Boiler-Plate

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var request = require("request");
    
var port = process.env.PORT || 3000;
var app = express();