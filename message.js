var postMessage = function postMessage(message) {
	var botResponse, options, body, botReq;

	botResponse = message;
	
	options = {
		hostname: 'api.groupme.com',
		path: '/v3/bots/post',
		method: 'POST'
	};

	body = {
		"bot_id" : botID,
		"text" : botResponse
	};

	console.log('sending ' + botResponse + ' to ' + botID);

	botReq = HTTPS.request(options, function(res) {
			if(res.statusCode == 202) {
				//neat
			} else {
				console.log('rejecting bad status code ' + res.statusCode);
			}
	});

	botReq.on('error', function(err) {
		console.log('error posting message '	+ JSON.stringify(err));
	});
	botReq.on('timeout', function(err) {
		console.log('timeout posting message '	+ JSON.stringify(err));
	});
	botReq.end(JSON.stringify(body));
};

module.exports.postMessage = postMessage;
