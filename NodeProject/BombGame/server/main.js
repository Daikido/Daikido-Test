modules.exports = function (io) {
    
    return function(socket){
        console.log("game connection");
        socket.on('update', function(data){

        });
    }
}