var mike = require('./mike.js');

module.exports = function(io){
    
    // timer handle
    function tick(){
        io.emit('update', mike.getNumber());
    }

    setInterval(tick, 14);
    
    // socket handle
    return function(socket){
        
        socket.on('click', function(data){
            mike.click();
        });
        
    }
}


