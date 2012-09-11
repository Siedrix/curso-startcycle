$(document).ready(function () {
	window.client = new Faye.Client('http://localhost:3000/faye');

	client.subscribe('/keys', function(message) {
		console.log('receiving', message);
	});

	key('up, down, left, right', function (event, handler) {
		console.log('sending', event.keyIdentifier);
		client.publish('/keys',{key : event.keyIdentifier});
	});
});