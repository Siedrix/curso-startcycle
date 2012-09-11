var request = require('request'),
  	JSONStream = require('JSONStream'),
  	es = require('event-stream');

var parser = JSONStream.parse(['rows', true, 'doc']),
  	req = request({url: 'http://isaacs.couchone.com/registry/_all_docs?include_docs=true'}),
  	logger = es.mapSync(function (data) {
  		if( data.description && data.description.search('stream') >= 0){
   			console.log(data.description);
  		}

      	return data
    });

req.pipe(parser).pipe(logger);



