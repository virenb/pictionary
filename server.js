var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users = [];
var count = 0;

io.on('connection', function(socket) {
	count++;

	io.sockets.on('connect', function(user) {
    users.push(user); 
    console.log('User is connected');
	});	

	socket.on('position', function(position) {
		console.log('Is drawing')
		socket.broadcast.emit('position', position);
		console.log(position);
		console.log('User is drawing');
	});

	socket.on('guess', function(guess) {
		socket.broadcast.emit('guess', guess);
		console.log(guess);
	});
	// socket.on('draw', function(){
	// 	console.log('User is drawing');
	// });


});

server.listen(8080);