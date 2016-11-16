var game = require('./game1.js');

module.exports = function (io) {
    // timer handle
    
    function start(){
        game.start();
        io.emit('start');
        setTimeout(stop, 10000);
    }

    function stop(){
        var result = game.stop();
        io.emit('stop', result);
        
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
            }

            socket.emit('join', result);
        });

        socket.on('click', function (data) {
            if(socket.user.online) return;
            game.click(socket.user.name);
        });

        socket.on('message', function (data) {
            if(socket.user.online) return;
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





