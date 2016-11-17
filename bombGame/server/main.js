var game = require('./game1.js');
function socketsOf(io){
    var list = [];
    for(var i in io.sockets.connected) list.push(io.sockets.connected[i]);
    return list;
}

var serverTime = Date();
module.exports = function (io) {
    // timer handle
    var ingame = false;
    function start() {
        if (ingame) return false;
        if (!game.start()) return false;
        ingame = true;
        io.emit('start');
        setTimeout(stop, 10000);
        return true;
    }

    function stop() {
        var result = game.stop();
        io.emit('stop', result);
        ingame = false;
    }
    // socket handle
    return function (socket) {

        console.log('connection');
        socket.user = { online: false };

        socket.emit('connection', serverTime);
        socket.on('join', function (data) {
            console.log("join request", data);
            if (socket.user.online) return;  // repeat request

            //var result = game.join(data.name);
            var result = "success";
            
            var names = socketsOf(io).map(s=>s.user.name);
            if(names.includes(data)) result = "namerepeat";

            socket.emit('join', result);
            if (result == "success") {
                socket.user.name = data;
                socket.user.online = true;
                console.log("success"); io.emit('message', { room: socket.user.name, name: socket.user.name, message:"", command: "join" });
                names.filter(n=>n!=undefined && n!=socket.user.name).map(n=>{
                    socket.emit('message', { room: n, name: n, message:"", command: "join" })
                });
            }

        });

        socket.on('click', function (data) {
            if (!socket.user.online) return;
            game.click(socket.user.name);
        });

        socket.on('message', function (data) {
            console.log(data);
            if (!socket.user.online) return;
            if (ingame) io.emit('message', { name: socket.user.name, message: data.message });
            socketsOf(io).filter(s => s.user.name == data.name).map(function (s) {
                socket.emit('message', { room: data.name, name: socket.user.name, message: data.message });
                s.emit('message', { room: socket.user.name, name: socket.user.name, message: data.message });
            });
        });

        socket.on('disconnect', function (data) {
            io.emit('message', { room: socket.user.name, name: socket.user.name, message:"離線", command: "leave" });
            game.leave(socket.user.name);
        });
    }
}