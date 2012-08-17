(function(global) {
	var reddit = {
		home : function(){
			var url = 'http://www.reddit.com/.json?jsonp=?';

			var dfd = $.getJSON(url);
			return dfd;
		},
		subreddit : function(subreddit){
			var url = 'http://www.reddit.com/r/'+ subreddit +'.json?jsonp=?';

			var dfd = $.getJSON(url);
			return dfd;			
		},
		thread : function(thread){
			var url = 'http://www.reddit.com'+ thread +'.json?jsonp=?';

			var dfd = $.getJSON(url);
			return dfd;			
		}
	}

	window.reddit = reddit;
})(window)