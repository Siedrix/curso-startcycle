var express = require('express'),
	cons    = require('consolidate'),
	app     = express();

var faye   = require('faye');
var server = new faye.NodeAdapter({mount: '/faye'});

var Grid = require('./public/grid').Grid;

var grid = new Grid();

grid.initMatrix();
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

app.use(server);
app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown")