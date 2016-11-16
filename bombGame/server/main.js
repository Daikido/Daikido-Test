var game = require('./game1.js');

module.exports = function (io) {
    // timer handle
    var ingame = false;
    function start(){
        if(ingame) return false;
        if(!game.start()) return false;
        ingame = true;
        io.emit('start');
        setTimeout(stop, 10000);
        return true;
    }

    function stop(){
        var result = game.stop();
        io.emit('stop', result);
        ingame = false;
    }

    // socket handle
    return function (socket) {
        console.log('connection');
        socket.user = {online: false};
        socket.on('join', function (data) {
            if(socket.user.online) return;  // repeat request

            var result = game.join(data.name);
            
            if(result=="success") {
                socket.user.name = data.name;
                socket.user.online = true;
                io.emit('player', socket.user.name);
            }

            socket.emit('join', result);
        });

        socket.on('click', function (data) {
            if(socket.user.online) return;
            game.click(socket.user.name);
        });

        socket.on('message', function (data) {
            if(socket.user.online) return;
            if(ingame) io.emit('message', {name: socket.user.name, message: data.message});
            io.sockets.filter(s=>s.user.name==data.name).map(function(s){
                s.emit('message', {name: socket.user.name, message: data.message});
            });
        });

        socket.on('disconnect', function (data) {
            if(socket.user.online) return;
            io.emit('message', {name: socket.user.name, command:"leave"});
            game.leave(socket.user.name);
        });
    }
}





