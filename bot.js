var HTTPS = require('https');
var HTTP = require('http');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;
var locked = false;

var intro = 0;

//User IDs
var bot = 		395976;
var aditya =	28705961;
var pranav =	25448183;
var rohith =	43484221;
var joey =		29263943;
var zach =		26215931;
var tim =		47476114;
var ian =		26281232;
var ken =		29454584;
var alice =		7668435;
var claire =	7668436;
var kelley =	24220651;
var tori =		28690781;
var juliag =	33611553;
var isabel =	24401015;
var ids = [bot, aditya, pranav, rohith, joey, zach, tim, ian, ken, alice, claire, kelley, tori, juliag, isabel];

//Commands
var command = '/',
	lock = '/lock',
	unlock = '/unlock',
	face = '/coolGuy',
	help = '/help',
	info = '/displayInfo',
	gif = '/gif',
	mention = '/summon';
var commands = [command, lock, unlock, face, help, info, gif, mention];

function listCommands(request) {
	var cList = '';
	if (request.text.length >= help.length+4 && request.text.substring(help.length+1, help.length+4)) {
		cList += 'List of all commands.\r\n';
		for (i = 1; i < commands.length; i++) {
			if (commands[i] === gif) {
				cList += commands[i] + " (Use responsibly...)\r\n";
			} else {
				cList += commands[i] + "\r\n";
			}
		}
	} else {
		cList += 'List of user commands (For all commands, use "/help all")\r\n';
		for (i = 1; i < commands.length; i++) {
			if (commands[i] === lock || commands[i] === unlock) {
				
			} else if (commands[i] === gif) {
				cList += commands[i] + " [search query] (Use responsibly...)\r\n";
			} else {
				cList += commands[i] + "\r\n";
			}
		}
	}
	return cList;
}

function is(request, command) {
	if (request.text.substring(0, command.length) === command) {
		return true;
	} else {
		return false;
	}
}
	
function processCommand(request) {
	if (ids.indexOf(parseInt(request.user_id)) === -1) {
		postMessage(parseInt(request.user_id) + ' (Ignore this)');
	}
	if (is(request, face)) {
		postMessage(cool());
	} else if (is(request, help)) {
		postMessage(listCommands(request));
	} else if (is(request, info)) {
		displayInfo(request);
	} else if (is(request, gif)) {
		if (request.name == 'Jb Core') {
			postMessage('No.');
		} else {
			searchGiphy(request.text.substring(gif.length + 1));
		}
	} else if (is(request, unlock)) {
		//Silent ignore
	} else if (is(request, mention)) {
		postMessage('Summoned.');
	} else {
		postMessage('Unknown command. Use "/help" for a list of commands'); 
	}
}

function respond() {
	
	var request = JSON.parse(this.req.chunks[0]); //The message sent to the bot
	
	//Check for command
	if (request.text && parseInt(request.user_id) !== bot && request.text.substring(0, command.length) === command) {
		//Check lock
		manageLock(request);
		if (locked) return;
		
		//Keep Pranav in line
		if (request.text && parseInt(request.user_id) === pranav) { //Pranav response
			var rand = Math.floor((Math.random() * 100) + 1);
			postMessage(rand);
			if (rand <= 10) {postMessage("Fuck off Pranav.");}
		}
		
		//Run command
		processCommand(request);
	}

}

function displayInfo(request) {
	postMessage(JSON.stringify(request));
}

function reportError(err) {
	postMessage('Error: ' + err.message);
}

function encodeQuery(query) {
	return query.replace(/\s/g, '+');;
}

function manageLock(key) {
	
	//Check if locking, unlocking, or neither
	if (key.text && key.text.substring(0, lock.length) == lock) {
		
		if (parseInt(key.user_id) === aditya) {
			if (locked) {
				postMessage("Already locked.");
			} else {
				postMessage("Locked.");
			}
			locked = true;
		}
	} else if (key.text && key.text.substring(0, unlock.length) == unlock) {
		if (parseInt(key.user_id) === aditya) {
			if (!locked) {
				postMessage("Already unlocked.");
			} else {
				postMessage("Unlocked.");
			}
			locked = false;
		}
	}
	
}

function searchGiphy(giphyToSearch) {
	var options = {
		host: 'api.giphy.com',
		path: '/v1/gifs/search?q=' + encodeQuery(giphyToSearch) + '&api_key=' + apiKey
	};

	var callback = function(response) {
		var str = '';

		response.on('data', function(chunck){
			str += chunck;
		});

		response.on('end', function() {
			if (!(str && JSON.parse(str).data[0])) {
				postMessage('Couldn\'t find a gif 💩');
			} else {
				var id = JSON.parse(str).data[0].id;
				var giphyURL = 'http://i.giphy.com/' + id + '.gif';
				postMessage(giphyURL);
			}
		});
	};

	HTTP.request(options, callback).end();
}

function mention(message) {
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
		// "attachments" : [{
			// "type" : "mentions",
			// "user_ids" : [aditya],
			// "loci" : [1,2]
		// }]
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
}


function postMessage(message) {
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
}

try {
	
	if (intro === 0) {
		postMessage('Deetz updated succesfully.');
		intro = 1;
	}
	
	exports.respond = respond;
} catch (err) {
	reportError('bot.js');
}
