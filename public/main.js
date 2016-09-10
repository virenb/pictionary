var pictionary = function() {
	var userName = prompt("What's your name?");
	var socket = io();
	var canvas, context;

	var draw = function(position) {
		context.beginPath();
		context.arc(position.x, position.y,
						6, 0, 2 * Math.PI);
		context.fill();
	};
	var isMousedown = false;

	// Listening for key presses in the input
	var guessBox;
	var userguess;
	var onKeyDown = function(event) {
	    if (event.keyCode != 13) { // Enter
	        return;
	    }
	    var userguess = userName + "'s Guess: " + guessBox.val();
	    console.log(userguess);
	    socket.emit('guess', userguess);
	    $('#usersGuess').text(userguess);
	    guessBox.val('');
	};

	guessBox = $('#guess input');
	guessBox.on('keydown', onKeyDown);
	socket.on('guess', function (stuff) {
		$('#usersGuess').text(stuff);
	});
	// End of listening section
	
	canvas = $('canvas');
	context = canvas[0].getContext('2d');
	canvas[0].width = canvas[0].offsetWidth;
	canvas[0].height = canvas[0].offsetHeight;
	canvas.on('mousedown', function(event) {
		isMousedown = true;
	})
	canvas.on('mouseup', function(event) {
		isMousedown = false;
	})
	canvas.on('mousemove', function(event) {
		if (isMousedown) {
		var offset = canvas.offset();
		var position = {x: event.pageX - offset.left,
						y: event.pageY - offset.top};
		draw(position);
		console.log(position);
		socket.emit('position', position);
		}
	});
	socket.on('position', draw);
};

$(document).ready(function() {
	pictionary();

});