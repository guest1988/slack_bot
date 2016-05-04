var express = require('express');
var bodyParser = require('body-parser');
var json2csv = require('json2csv');
var fs = require('fs');
 
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
    return res.status(200).json('#checkin !!');
  } else {
    return res.status(200).end();
  }
});

app.post('/aftercheckin', function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Hello ' + userName + ', you came to work on '+req.body.text
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
  
  var fields = ['car', 'price', 'color'];
  
  var myCars = [
    {
      "car": "Audi",
      "price": 40000,
      "color": "blue"
    }, {
      "car": "BMW",
      "price": 35000,
      "color": "black"
    }, {
      "car": "Porsche",
      "price": 60000,
      "color": "green"
    }, {
      "car": "Fiat",
      "price": 2500,
      "color": "white"
    }
  ];
  
  var datas = '';
  
  json2csv({ data: myCars, fields: fields }, function(err, csv) {
    if (err) console.log(err);
    //console.log(csv);
    datas = csv;
  });

  function saveAsFile() {
    var exportData = datas;
    var filename = 'snowfall_workers.csv';
    var mimetype = 'application/csv';
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-disposition','attachment; filename='+filename);
    res.send(exportData);
  }

  saveAsFile();
    
});