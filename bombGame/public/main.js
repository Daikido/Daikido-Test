var socket = io();

function click(){
    socket.emit('click', {});
}

socket.on('update', update);
