var socket = io();

function EventRocket() {
    var eventHandlers = {};
    this.on = function (event, callback) {
        if (eventHandlers[event] == undefined) eventHandlers[event] = [];
        eventHandlers[event].push(callback);
    }

    this.go = function (event, data) {
        if (eventHandlers[event] != undefined)
            eventHandlers[event].map(data);
    }
}
var just = new EventRocket();
var hans = new EventRocket();

hans.on("join", function (data) { socket.emit('join', { name: data }); });

hans.on("click", function () { socket.emit('click'); });

hans.on("say", function (data) { socket.emit('message', data); });

socket.on('message', function (data) {
    if (data.command == "leave") just.go("leave", data.name);
    else just.go("message", { name: data.name, message: data.message });
});

















