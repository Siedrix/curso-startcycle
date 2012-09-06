$(document).ready(function () {
	var grid = new Grid();

	grid.render($('#grid'));

	window.client = new Faye.Client('http://192.168.1.131:3000/faye');

	client.subscribe('/messages', function(message) {
		console.log(message);
		$('.grid tr:eq('+ message.y +') td:eq('+ message.x +')').css('background-color', message.color);
	});
});