var express = require('express'),
	cons    = require('consolidate'),
	app     = express(),
	fs      = require('fs');

var watchedFiles = {};
var watchFile = function (fileName) {

	if( watchedFiles[fileName] ){
		console.log('file already watched', fileName);
		return;
	}

	console.log('watching ', fileName);

	fs.watch('./'+ fileName +'.js', function () {
		var file = fs.readFileSync('./'+ fileName +'.js').toString().trim();
		console.log('file has changed', fileName, file.toString());

		if( watchedFiles[fileName] !== file){
			fayeClient.publish('/file/'+fileName,{
				file : file.toString()
			});
		}

		watchedFiles[fileName] = file;
	});

	watchedFiles[fileName] = true;
}

// Faye Server
var faye   = require('faye');
var server = new faye.NodeAdapter({mount: '/faye'});
var fayeClient = server.getClient();

// Static Files Folder
app.use(express.static('./public'));

app.get('/', function(req, res){
  	res.send('Chrome buffer server');
});

app.get('/connect/', function(req, res){
	console.log(req.query);

	res.send('ok');
});

var extension = {
	incoming : function (message, callback) {
		if(message.channel === '/watch'){
			console.log(message);

			watchFile(message.data.file);
		}

		if(message.channel.search('/file') >=0){
			console.log('file changed message', message);
		}

		callback(message);
	}
}

server.addExtension(extension);


app.use(server);
app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown")