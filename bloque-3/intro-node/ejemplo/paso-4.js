var express = require('express');

var app = express();

var messages = [];


app.get('/', function(req, res){
  	res.send('Hello world');
});

app.get('/mensaje/new/:mensaje', function(req, res){
	messages.push(req.params.mensaje);

	res.send('mensaje enviado');
});

app.get('/mensaje/list', function(req, res){
	res.send(messages);
});

app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown");
