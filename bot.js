var HTTPS = require('https');
var HTTP = require('http');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;
var locked = false;

function respond() {
  var me = 28705961;
  var pranav = 25448183;

  var request = JSON.parse(this.req.chunks[0]), //The message sent to the bot
    face = '/coolGuy',
    greeting = 'hey',
    info = '/displayInfo',
    date = '/getDate',
    deetz = 'Hey Deetz',
    lock = '/lock',
    unlock = '/unlock',
    gif = '/gif';
  
  if (locked) {
    if (request.text && request.text.substring(0, unlock.length) === unlock) { //Message info
      
      if (parseInt(request.user_id) === me) {
        locked = false;
        postMessage("Unlocked.");
        return;
      } else {
        postMessage("No.");
      }
    } else {
      return;
    }
  }
  
  if (request.text && parseInt(request.user_id) === pranav) { //Pranav response
    postMessage("Fuck off Pranav.");
  } else if (request.text && request.text.length > gif.length && request.text.substring(0, gif.length) === gif) {
    try {
      searchGiphy(request.text.substring(gif.length + 1));
    } catch (err) {
      reportError();
    }
  } else if (request.text && request.text.substring(0, face.length) === face) { //Cool guy face
    postMessage(cool());
  } else if (request.text && request.text.substring(0, info.length) === info) { //Message info
    displayInfo(request);
  } else if (request.text && request.text.substring(0, lock.length) === lock) { //Lock bot
    locked = true;
    postMessage("Locked.");
  } else if (request.text && request.text.substring(0, deetz.length) === deetz) { //Greet me
    if (parseInt(request.user_id) === me) {
      postMessage("Hello Aditya. I hope you're having a nice day.");
    } else {
      postMessage("Fack off.");
    }
  } else {
    console.log("don't care");
  }
}

function displayInfo(request) {
  postMessage(JSON.stringify(request));
}

function reportError() {
  postMessage("Uh... Something went wrong =/");
}

function encodeQuery(query) {
  return query.replace(/\s/g, '+');;
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
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
