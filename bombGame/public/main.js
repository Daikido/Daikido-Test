var socket = io();

function join(name){
    socket.emit('join', {name: name});
}

function click(){
    socket.emit('click');
}

function say(name, message){
    socket.emit('message', {name: name, message: message});
}

socket.on('message', function(data){
    if(data.command=="leave") leave(data.name);
    else message(data.name, data.message);
});