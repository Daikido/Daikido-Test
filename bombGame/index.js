var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static(__dirname+"/public"));


var main = require('./server/main.js');

io.on('connection', main(io));
server.listen(25565);
console.log("server is running");