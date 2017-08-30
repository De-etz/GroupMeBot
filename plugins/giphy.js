module.exports.searchGiphy = function searchGiphy(giphyToSearch, key) {
	
	var apiKey = key;
	
	var HTTPS = require('https');
	var HTTP = require('http');
	
	var options = {
		host: 'api.giphy.com',
		path: '/v1/gifs/search?q=' + giphyToSearch.replace(/\s/g, '+') + '&api_key=' + apiKey
	};

	var callback = function(response) {
		var str = '';

		response.on('data', function(chunck){
			str += chunck;
		});

		response.on('end', function() {
			if (!(str && JSON.parse(str).data[0])) {
				postMessage('Couldn\'t find a gif ðŸ’©');
			} else {
				var id = JSON.parse(str).data[0].id;
				var giphyURL = 'http://i.giphy.com/' + id + '.gif';
				postMessage(giphyURL);
			}
		});
	};

	HTTP.request(options, callback).end();
};