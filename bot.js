var plug = './plugins/';

var HTTPS = require('https');
var HTTP = require('http');
var cool = require('cool-ascii-faces');
var slapper = require(plug+'slap.js');

var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;
var locked = false;

var intro = 0;

// User IDs
var bot = 		395976;
var adityas =	28705961;
var alainas =	26324111;
var alexa =		37554485;
var alexb =		28551558;
var alexisk =	43694487;
var alicem =	7668435;
var alicet =	43030267;
var annalig =	34197001;
var anorai =	23240013;
var blairc =	25448184;
var brycew =	31890188;
var camdens =	31072505;
var catheriner =24098720;
var chasec =	27945968;
var claireg =	7668436;
var dzidupeek =	37853175;
var elizabethh =5238889;
var emmaw =		30154745;
var evanm =		31655413;
var harir =		20639763;
var gabbic =	32320507;
var hunterc =	8830642;
var ianc =		26281232;
var isabelj =	24401015;
var jackr =		26215932;
var jareda =	26233424;
var jbc =		28181092;
var jenniez =	34278340;
var joeyt =		29263943;
var joshw =		8931279;
var juliag =	33611553;
var juliap =	28200787;
var justinp =	34562803;
var kaneb =		31266486;
var karenj =	30153959;
var kelleyl =	24220651;
var kennethk =	40324748;
var kenp =		29454584;
var laurenl =	7668434;
var laurens =	33335699;
var lornaf =	32860874;
var madisonk =	5238905;
var makennar =	37631615;
var michaelc =	8830643;
var nicks =		26215934;
var nickw =		38803444;
var noahh =		24037063;
var oliviaw =	8770582;
var palinah =	31652199;
var pranavr =	25448183;
var rahulc =	35866129;
var rohithp =	43484221;
var shraddhap =	30155431;
var simmid =	9603427;
var simons =	27319066;
var sophiet =	32633725;
var spencerg =	48026577;
var timk =		47476114;
var toric =		28690781;
var zachd =		26215931;

var ids = [bot, adityas, alainas, alexa, alexb, alexisk, alicem, alicet, annalig, anorai, blairc, brycew, camdens, catheriner, chasec, claireg, dzidupeek, elizabethh, emmaw, evanm, gabbic, harir, hunterc, ianc, isabelj, jackr, jareda, jbc, jenniez, joeyt, joshw, juliag, juliap, justinp, karenj, kaneb, kelleyl, kennethk, kenp, laurenl, laurens, lornaf, madisonk, makennar, michaelc, nicks, nickw, noahh, oliviaw, palinah, pranavr, rahulc, rohithp, shraddhap, simmid, simons, sophiet, spencerg, timk, toric, zachd];

var names = ['DeetzBot', 'Aditya', 'Alaina', 'Alex', 'Alex', 'Alexis', 'Alice', 'Alice', 'Anna Li', 'Anora', 'Blair', 'Bryce', 'Camden', 'Catherine', 'Chase', 'Claire', 'Dzidupe', 'Elizabeth', 'Emma', 'Evan', 'Gabbi', 'Hari', 'Hunter', 'Ian', 'Isabel', 'Jack', 'Jared', 'JB', 'Jennie', 'Joey', 'Josh', 'Julia', 'Julia', 'Justin', 'Karen', 'Kane', 'Kelley', 'Kenneth', 'Ken', 'Lauren', 'Lauren', 'Lorna', 'Madison', 'Makenna', 'Michael', 'Nick', 'Nick', 'Noah', 'Olivia', 'Palina', 'Pranav', 'Rahul', 'Rohith', 'Shraddha', 'Simmi', 'Simon', 'Sophie', 'Spencer', 'Tim', 'Tori', 'Zach']

//Commands
var command = '/',
	lock = '/lock',
	unlock = '/unlock',
	face = '/coolguy',
	help = '/help',
	info = '/displayinfo',
	gif = '/gif',
	summon = '/summon',
	slap = '/slap',
	testCmd = '/test';
var commands = [command, lock, unlock, face, help, info, gif, summon, slap, testCmd];

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
			if (commands[i] === lock || commands[i] === unlock || commands[i] === summon) {
				
			} else if (commands[i] === gif || commands[i] === stock) {
				cList += commands[i] + " [search query]\r\n";
			} else if (commands[i] === slap) {
				cList += commands[i] + " [victim]\r\n";
			} else {
				cList += commands[i] + "\r\n";
			}
		}
	}
	return cList;
}

function is(request, command) {
	
	var userText = request.text.substring(0, command.length).toLowerCase();
	
	if (userText === command) {
		return true;
	} else {
		return false;
	}
}
	
function processCommand(request) {
	
	if (is(request, face)) {
		postMessage(cool());
	} else if (is(request, help)) {
		postMessage(listCommands(request));
	} else if (is(request, info)) {
		displayInfo(request);
	} else if (is(request, gif)) {
		if (request.text.length > slap.length+1) {
			searchGiphy(request.text.substring(gif.length + 1), apiKey);
		} else {
			postMessage('Specify a search query (See /help for syntax)');
		}
	} else if (is(request, unlock)) {
		//Silent ignore
	} else if (is(request, testCmd)) {
		// addMember('Hey');
	} else if (is(request, slap)) {
		if (request.text.length > slap.length+1) {
			var attacker = names[ids.indexOf(parseInt(request.user_id))];
			var victim = request.text.substring(slap.length + 1);
			postMessage(slapper.generateSlap(attacker, victim));
		} else {
			postMessage('Specify a victim (See /help for syntax)');
		}
	} else if (is(request, summon)) {
		if (parseInt(request.user_id) == adityas) {
			summonAll();
		}
	} else {
		postMessage('Unknown command. Use "/help" for a list of commands'); 
	}
}

function respond() {
	
	var request = JSON.parse(this.req.chunks[0]); //The message sent to the bot
	
	//Check for command
	if (request.text && parseInt(request.user_id) !== bot) {
		//Check lock
		manageLock(request);
		if (locked) return;
		
		//Keep Pranav in line
		if (request.text && parseInt(request.user_id) === pranavr) { //Pranav response
			var rand = Math.floor((Math.random() * 100) + 1);
			postMessage(rand);
			if (rand <= 33) {postMessage("Fuck off Pranav.");}
		} else {
			
			try {
				//Run command;
				processCommand(request);
			} catch (err) {
				reportError(err);
			}
		}
	}

}

function displayInfo(request) {
	postMessage(JSON.stringify(request));
}

function reportError(err) {
	postMessage('Error: ' + err.message);
}

function manageLock(key) {
	
	//Check if locking, unlocking, or neither
	if (key.text && key.text.substring(0, lock.length) == lock) {
		
		if (parseInt(key.user_id) === adityas) {
			if (locked) {
				postMessage("Already locked.");
			} else {
				postMessage("Locked.");
			}
			locked = true;
		}
	} else if (key.text && key.text.substring(0, unlock.length) == unlock) {
		if (parseInt(key.user_id) === adityas) {
			if (!locked) {
				postMessage("Already unlocked.");
			} else {
				postMessage("Unlocked.");
			}
			locked = false;
		}
	}
	
}

function summonAll() {
	
	var userCount = ids.length;
	var midpoint = Math.round(userCount/2);
	
	var firstHalf = [];
	var k = 0;
	for (i = 0; i < midpoint; i++) {
		firstHalf[k] = ids[i];
		k++;
	}
	summonUsers(firstHalf);
	
	var secondHalf = [];
	k = 0;
	for (i = midpoint; i < userCount; i++) {
		secondHalf[k] = ids[i];
		k++
	}
	summonUsers(secondHalf);
}

function summonUsers(users) {
	var botResponse, options, body, botReq;
	
	botResponse = "Like these messages if you received a notification from me (the bot)";
	
	options = {
		hostname: 'api.groupme.com',
		path: '/v3/bots/post',
		method: 'POST'
	};

	var loci = new Array();
	for (i = 0; i < users.length; i++) {
		loci[i] = [0,59];
	}
	
	body = {
		"bot_id" : botID,
		"text" : botResponse,
		"attachments" : [{
			"type" : "mentions",
			"user_ids" : users,
			"loci" : loci
		}]
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

function addMember(message) {
	var botResponse, options, body, botReq;

	botResponse = message;
	
	options = {
		hostname: 'api.groupme.com',
		path: '/v3/groups/:31379218/members/add',
		method: 'POST'
	};
	
	var newMember = {
		"nickname": "Drizzy",
		"user_id": "1234"
	};
	
	body = {
		"members" : [newMember];
	};

	// botReq = HTTPS.request(options, function(res) {
			// if(res.statusCode == 202) {
				// //neat
			// } else {
				// console.log('rejecting bad status code ' + res.statusCode);
			// }
	// });
	
	// botReq.end(JSON.stringify(body));
}

function searchGiphy(giphyToSearch) {
	
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
	
	HTTPS.request(options, callback).end();
	
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

if (intro === 0) {
	postMessage('Deetz updated succesfully.');
	intro = 1;
}

exports.respond = respond;
