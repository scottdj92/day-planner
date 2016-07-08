require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//config

mongoose.connect(MONGODB_URI);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlEncoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//model
var Event = mongoose.model('Event', {
    text: String
});

//ROUTES



//start app
app.listen(8080);
console.log('Day Planner listening on port 8080');
