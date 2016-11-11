var Game = require('./game.js');
var game = new Game();

modules.exports = function (io) {
    
    return function(socket){
        console.log("game connection");

        socket.on('pack', function(data){
            socket.emit('pack', game.pack(data.x, data.y, data.w, data.h, data.getter));
        });
    }
}