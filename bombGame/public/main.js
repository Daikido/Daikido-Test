var socket = io();

function click(data){
    socket.emit('click', data);
}

socket.on('update', function(data){
    update(data);
};
