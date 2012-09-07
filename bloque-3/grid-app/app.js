var express = require('express'),
	cons    = require('consolidate'),
	app     = express(),
	fs      = require('fs');

var faye   = require('faye');
var server = new faye.NodeAdapter({mount: '/faye'});

var Grid = require('./public/grid').Grid;

var grid = new Grid();

var gridData = fs.readFileSync('./data.json');

grid.initMatrix( JSON.parse(gridData) );
grid.matrix[0][1] = '#000000';

// Static Files Folder
app.use(express.static('./public'));

// View Engine
app.engine('html', cons.jqtpl);
// Set .html as the default extension 
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', function(req, res){
  	res.render('index',{title : 'Hello World', grid: grid.toJSON() });
});

var extension = {
	incoming : function (message, callback) {
		if(message.channel === '/messages'){
			console.log(message);
			var x = message.data.x;
			var y = message.data.y;
			var color = message.data.color;

			grid.matrix[x][y] = color;			

			fs.writeFile('./data.json', JSON.stringify(grid.toJSON() ), function () {
				console.log('file save');
			});
		}


		callback(message);
	}
}

server.addExtension(extension);

app.use(server);
app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown")