var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
var port = process.env.PORT || 1337;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!'); });
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});

//creating slackbot
app.post('/checkin', function (req, res, next) {
  var userName = req.body.user_name;
  //var body = req.body;
  var date = Date().toLocaleString();;
  var botPayload = {
    text : 'Hello ' + userName + ', you started to work on '+date;
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});
/*app.post('/checkout', function (req, res, next) {
  var userName = req.body.user_name;
  //var body = req.body;
  var date = Date().toLocaleString();;
  var botPayload = {
    text : 'Bye ' + userName + ', you finished  your  work on '+date;
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});*/