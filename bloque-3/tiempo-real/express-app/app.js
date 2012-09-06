var express = require('express'),
	cons    = require('consolidate'),
	app     = express();

// Static Files Folder
app.use(express.static('./public'));

// View Engine
app.engine('html', cons.jqtpl);
// Set .html as the default extension 
app.set('view engine', 'html');
app.set('views', './views');

var homeHandler = function(req, res){
  	res.render('index',{title : 'Hello World'});
}

app.get('/', homeHandler);

app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown")