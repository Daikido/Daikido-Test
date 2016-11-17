var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static(__dirname+"/public"));


var main = require('./server/main.js');
var chatServer = require('./server/chatServer.js');
io.on('connection', function(socket){
    chatServer.connection(io)(socket);
});
server.listen(25565);
console.log("server is running");