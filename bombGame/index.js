var express = require('express');
var app = express();
var server = require('http').Server(app);
server.listen(3000);
console.log("server is running");

var io = require('socket.io')(server);

app.use(express.static(__dirname+"/public"));


io.on('connection', function(socket){
    
});