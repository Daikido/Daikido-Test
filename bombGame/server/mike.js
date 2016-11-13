var arr1 = [];
for (var i = 0; i < 10; i++) {
    var arr2 = [];
    for (var j = 0; j < 10; j++) {
        arr2.push(j);
    }
    arr1.push(arr2);
}

var set = function (x, y, data) {
    arr1[x][y] = data;
}
var get = function (x, y) {
    if(x<0||y<0) return 0;
    return arr1[x][y];
}
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        set(i, j, 0);
    }
}
for (var i = 0; i < 70; i++) {
    var bombx = Math.floor(Math.random() * 10);
    var bomby = Math.floor(Math.random() * 10);
    set(bombx, bomby, 1);
}
var test = function (x, y) {
    var a = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (get(x + i, y + j))
                a += 1;
        }
    }

    return a;
}
function loseGame(){
    confirm("You are lose !!!");
}
var clickBomb=function(x,Y){
    if(get(x,y))
        return loseGame;
    else
        set(x,y,test(x,y))  
}
var setFlag=function(x,y){
    set(x,y,2);
}
function pad(s, l){
    s = s.toString();
    if(s.length<l) return pad(s+' ', l);
    return s;
}
function draw(array){
    var text = array.map(arr=>{
        return arr.map(a=>{
            return pad(a,3);
        }).join('');
    }).join('\r\n');
    console.log(text);
}
var number = 0;
var time = 0;
exports.update = function (t) {
    var delta = t - time;
    time = t;
}
exports.click = function (n) {
    number += n;
}

exports.getNumber = function () {
    return number;
}
