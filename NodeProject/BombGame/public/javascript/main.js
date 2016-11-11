var socket = io();

var x = 0;
var y = 0;
var w = 5;
var h = 5;

var table = document.createElement('table');
for (var i = 0; i < w; i++) {
    var tr = document.createElement('tr')
    for (var j = 0; j < h; j++) {
        var td = document.createElement('td');
        td.setAttribute('id', `${i}_${j}`);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);
socket.on('pack', function (data) {
    console.log(data);
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            var xx = i + x;
            var yy = j + y;
            var td = document.getElementById(`${i}_${j}`);
            if (data[xx] != undefined && data[xx][yy] != undefined) {
                var d = data[xx][yy];
                td.innerHTML = d.map(dd => "<p>" + dd.join(' ') + "</p>").join('');
            } else td.innerHTML = "";
        }
    }
});

function get() {
    socket.emit('pack', {
        x: x,
        y: y,
        w: w,
        h: h
    });
}

function set(x, y, data) {
    socket.emit('set', {
        x: x, y: y, data: data
    });
}
