var app = require('express')();
var request = require('request');
var http = require('http');
var server = http.Server(app);
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var uni = require(path.resolve(__dirname + '/helper/universal.js'));
var config = {};

var log = uni.log;

//Just a debugging helper
function pl(msg){
  console.log('DEBUG->'+msg);
}

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function (req, res) {
    log('GET: /');
    res.sendFile(path.resolve(__dirname 
                           + '/public/html/index.html'));
});


app.get('/speaker/:speaker_num/:command', function (req, res) {
  var spkNum = req.params.speaker_num;
  var cmd = req.params.command;
  
  log('GET: ' + '/' + spkNum + '/' + cmd);
  request.get(
    'http://192.168.0.210/speaker/' + spkNum + '/' + cmd,
    function(err, response, body){
      //This is an expected error
      if (!err && response.statusCode == 200) {
        log(body);
        res.send(body);
      }else if(err){
        res.send(err);
        log(err);
      }
    });
});

//This will had out requests to the public directory, on
//get requests
app.get('/:resource_type/:resource', function (req, res) {
    var resourceFilePath = path.resolve(__dirname 
                            + '/public/'
                            + req.params.resource_type
                            + '/' 
                            + req.params.resource);
    if(fs.existsSync(resourceFilePath)){
      res.sendFile(resourceFilePath);
    }else{
      res.status(404).send('404: Page not Found');
    }
});


fs.readFile('./config.json', 'utf8', function (err, data) {
  if (err) throw err;
  config = JSON.parse(data);
  
  server.listen(config.port, function(){
      log('listening on *:' + config.port);
  });
});
