var mike = require('./mike.js');
var time = 0;
module.exports = function(io){
    
    // timer handle
    function tick(){
        
        mike.update(time);
        
        io.emit('update', mike.getNumber());
        
        time+=14;
    }

    setInterval(tick, 14);
    
    // socket handle
    return function(socket){
        console.log('connection');
        socket.on('click', function(data){
            console.log(data);
            mike.click(data);
        });
        
    }
}


