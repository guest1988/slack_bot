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


app.post('/checkin', function (req, res, next) {
  var userName = req.body.user_name;
  var date = Date();
  var botPayload = {
    text : 'Hello ' + userName + ', you came to work on '+date
  };
  
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});


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


app.post('/help', function (req, res, next) {
  var userName = req.body.user_name;
  
  var botPayload = {
    text : "This bot has option:" + "\r\n" + "#checkin - record user checkin"
    +"\r\n" + "#checkout - record user checkout" + "\r\n" + "#reseat - reset analititics by admin and"
    +"\r\n" + "#express - export analitics from db to local comp by admin."};
  
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

//export 
app.get('/export', function (req, res, next) {
  
  var fields = ['car.make', 'car.model', 'price', 'color'];
  
  var myCars = [
    {
      "car": {"make": "Audi", "model": "A3"},
      "price": 40000,
      "color": "blue"
    }, {
      "car": {"make": "BMW", "model": "F20"},
      "price": 35000,
      "color": "black"
    }, {
      "car": {"make": "Porsche", "model": "9PA AF1"},
      "price": 60000,
      "color": "green"
    }
  ];

  //export jason to csv
  json2csv({ data: myCars, fields: fields }, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile('file.csv', csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  });    
});