var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");
var io=require('socket.io')(httpServer);

var port = 3000; 
var sender;
 
app.use(express.static(__dirname + '/'));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/lmclient.html');
});

httpServer.listen(port);  
console.log('http://localhost:' + port);  

io.on('connection', function (socket) {  
	console.log(socket.id);
	sender = socket;
});

five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 3600
  });

  temperature.on("data", function() {
    console.log(this.celsius);
    sender.emit('Temperature reading', this.celsius);
  });
});

