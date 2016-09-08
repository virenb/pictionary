var pictionary = function() {
	var socket = io();
	var canvas, context;

	var draw = function(position) {
		context.beginPath();
		context.arc(position.x, position.y,
						6, 0, 2 * Math.PI);
		context.fill();
	};

	canvas = $('canvas');
	context = canvas[0].getContext('2d');
	canvas[0].width = canvas[0].offsetWidth;
	canvas[0].height = canvas[0].offsetHeight;
	canvas.on('mousemove', function(event) {
		var offset = canvas.offset();
		var position = {x: event.pageX - offset.left,
						y: event.pageY - offset.top};
		draw(position);
		console.log(position);
		socket.emit('position', position);
	});
	socket.on('position', draw);
};

$(document).ready(function() {
	pictionary();

});