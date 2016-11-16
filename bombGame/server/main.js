var game = require('./game1.js');

module.exports = function(io){
    
    // timer handle
    function tick(){
        
        
    }

    setInterval(tick, 14);
    
    // socket handle
    return function(socket){
        console.log('connection');

        socket.on('join', function(data){
            var result = game.join(data.name);

            switch(result){
                case "success": break;
                case "namerepeat": break;
                case "full": break;
            }

        });
        
        socket.on('click', function(data){

        });

        socket.on('message', function(data){

        });

        socket.on('disconnect', function(data){

        });
    }
}


