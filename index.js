// Express Boiler-Plate

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var request = require("request");
    
var app = express();

require('dotenv').load();

app.set('port', (process.env.PORT || 3000));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set("view options", {
  layout: false
});

app.use(express.static(__dirname + "/public"));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

app.get('/test', function(req, res) {
	res.send('bannaa');
});

app.get('/nbaVines', function(req, res) {
	request({
		uri: 'https://api.vineapp.com/timelines/tags/nba',
		method: 'GET',
		qs: req.query,
		json: true
	}, function (error, response, body) {
		if (error) res.status(500).send({error: "Internal Server Error"});
		res.send(body);
	});
});