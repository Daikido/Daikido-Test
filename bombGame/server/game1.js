var players = {};
function Player(name) {
    this.name = name;
}
exports.join = function (name) {
    var number = 0
    for (var i in players) {
        number += 1;
    }
    if (number >= 5) return "full";
    if (players.hasOwnProperty(name)) return "namerepeat";
    players[name] = new Player(name);
    return "success";
}

exports.Start = function () {
    if (number === 5) {
        for (var i in players) {
            players[i].state = 0;
        }
        return true;
    }
    else {
        return false;
    }

};
exports.click = function (name) {
players[name].state=1;
}; // name

exports.stop = function () {
for(var i in players){
    return players[i];
}
};

exports.leave = function (name) {

}; // name
exports.result=function(){
var a=0;
for(var i in players){
    var state = players[i].state;
    a+=state;
}
if(a>=2){
    for(var i in players){
        if(players[i].state=1)
        players[i].result="lose";
    }
}
if(a===1){
    for(var i in players){
        if(players[i].state=1)
        players[i].result="win";
    }
}
if(a===0){
    for(var i in players){
        players[i].result="nextRound";
    }
}

};