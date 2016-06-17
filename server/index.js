'use strict'

var express = require('express'),
				app = express(),
			https =  require('https'),
				 fs = require('fs'),

 bodyParser = require('body-parser'),
 		 morgan = require('morgan'),

 		sentiment = require('sentiment');
 	// 	 retext = require('retext'),
 	// 	 	emoji = require('retext-emoji'),
 	// sentiment = require('retext-sentiment'),
 	// 	inspect = require('unist-util-inspect');

///// MIDDLEWARE 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
/////


app.get('/', function(req, res, next){
	// res.send('hello!');
	// console.log('req.body', req.body);
	// var ranking = req.body;

	res.send('hello from back here');
});



///// ERROR HANDLING 
app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});
/////

https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app)
.listen(3000, function(){
	console.log('listening....');
});


