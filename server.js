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
    text: String,
    date: req.body.date,
    timeStart: req.body.eventStart,
    timeEnd: req.body.eventEnd
});

//ROUTES

    //api
    //get all events
    app.get('/api/events', function(req, res) {
        //leverage mongoose to find all events in db
        Event.find(function(err, events) {
            if (err) {
                res.send(err);
            } else {
                res.json(events);
            }
        });
    });

    //create event
    app.post('/api/events', function(req, res) {
        Event.create({
            title: req.body.text,
            date: req.body.date,
            timeStart: req.body.eventStart,
            timeEnd: req.body.eventEnd,
            done: false
        }, function(err, event) {
            if (err) {
                res.send(err);
            } else {
                Event.find(function(err, events) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(events);
                    }
                });
            }
        });
    });

    app.delete('/api/events/:event_id', function(req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function(err, event) {
            if(err) {
                res.send(err);
            } else {
                Event.find(function(err, events) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json(events);
                    }
                });
            }
        });
    });

//application
app.get('*', function(req, res) {
    res.sendfile('./app/app.html');
});

//start app
app.listen(8080);
console.log('Day Planner listening on port 8080');
