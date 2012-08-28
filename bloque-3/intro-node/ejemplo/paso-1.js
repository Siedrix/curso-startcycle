var express = require('express');

var app = express();

app.get('/', function(req, res){
  	res.send('Hello world');
});

app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown");
