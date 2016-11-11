var Game = require('./game.js');
var game = new Game();

module.exports = function (io) {
    
    return function(socket){
        console.log("game connection");

        socket.on('pack', function(data){
            socket.emit('pack', game.pack(data.x, data.y, data.w, data.h, block=>block.data));
        });

        socket.on('set', function(data){
            game.set(data.x, data.y, data.data);
        })
    }
}