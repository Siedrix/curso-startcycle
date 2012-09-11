var express = require('express'),
	cons    = require('consolidate'),
	app     = express(),
	fs      = require('fs');

// Faye Server
var faye   = require('faye');
var server = new faye.NodeAdapter({mount: '/faye'});

// Open write stream to file;
var stream = fs.createWriteStream('./data.json');

// Static Files Folder
app.use(express.static('./public'));

// View Engine
app.engine('html', cons.jqtpl);
// Set .html as the default extension 
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', function(req, res){
  	res.render('index',{title : 'Do the wasd!!' });
});

var extension = {
	incoming : function (message, callback) {
		if(message.channel === '/keys'){
			console.log(message);
			stream.write(JSON.stringify(message)+'\n');
		}

		callback(message);
	}
}

server.addExtension(extension);

app.use(server);
app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown")