var socket = io();
socket.on('pack', function(data){
    console.log(pack);
});

function sendRequest(){
    socket.emit('pack', {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
        g: function(block){
            return block.data;
        }
    });
}
