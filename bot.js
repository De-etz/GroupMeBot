var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var me = 28705961;
  var request = JSON.parse(this.req.chunks[0]), //The message sent to the bot
    face = '/cool guy',
    greeting = /^\/hello$/,
    info = '/displayInfo',
    date = '/getDate',
    deetz = 'respond';

  if (request.text && request.text.substring(0, face.length) === face) {
    //this.res.writeHead(200);
    postMessage(cool());
    //this.res.end();
  } else if (request.text && greeting.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Hi!!!");
    this.res.end();
  } else if (request.text && request.text.substring(0, info.length) === info) {
    this.res.writeHead(200);
    displayInfo(request);
    this.res.end();
  } else if (request.text && request.text.substring(0, deetz.length) === deetz) {
    this.res.writeHead(200);
    if (parseInt(request.user_id) === me) {
      postMessage("Hey!");
    } else {
      postMessage("Fack off.");
    }
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function displayInfo(request) {
  postMessage(JSON.stringify(request));
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
