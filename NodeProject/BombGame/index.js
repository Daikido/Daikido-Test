var express = require('express');
var app = express();

var server = require('http').Server(app);

app.use(express.static(__dirname+"/public"));

var io = require('socket.io')(server);
var main = require('./server/main.js');
io.on('connection', main(io));

server.listen(3000);
console.log("server is running");