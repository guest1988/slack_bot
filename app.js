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

//creating slackbot for checkin
app.post('/checkin', function (req, res, next) {
  var userName = req.body.user_name;
  var date = Date();
  var botPayload = {
    text : 'Hello ' + userName + ', you came to work on '+date+' and '+ req.body.oldest
  };
  
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

//creating slackbot for checkout
app.post('/checkout', function (req, res, next) {
  var userName = req.body.user_name;
  var date = Date();
  var botPayload = {
    text : 'Bye ' + userName + ', you finished your work on '+date
  };
  
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});