"use strict";
var https = require('https');
var fs  = require('fs');
var express = require('express');
var app = express();
var options = { 
	key: fs.readFileSync('key.pem'), 
	cert: fs.readFileSync('cert.pem') 
};
var httpsServer = https.createServer(options, app);
var io = require('socket.io')(httpsServer);

var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
	res.status(200).json({ message: 'Stitch Socket Server!' });
});

io.on('connection', function(socket) {
	console.log('# client connected', socket);
	socket.emit('message', 'This is a message from the dark side.');
});

httpsServer.listen(port);
console.log('Magic happens on port: ' + port);