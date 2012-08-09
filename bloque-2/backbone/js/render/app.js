$(document).ready(function () {
	window.todoApp = new app.AppView();
	
	app.Todos.fetch();
});