var arr1 = [];

function startGame(w, h, p) {
    for (var i = 0; i < w; i++) {
        var arr2 = [];
        for (var j = 0; j < h; j++) {
            arr2.push(j);
        }
        arr1.push(arr2);
    }
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            set(i, j, -4);
        }
    }
    var a = 0
    for (var i = 0; i < (w * h * p) + a; i++) {
        var bombx = Math.floor(Math.random() * w);
        var bomby = Math.floor(Math.random() * h);
        if (get(bombx, bomby) !== -1) {
            set(bombx, bomby, -1);
        } else {
            a += 1;
        }
    }
}

function loseGame() {
    confirm("You are lose !!!");
}
var set = function (x, y, data) {
    arr1[x][y] = data;
}
var get = function (x, y) {
    if (x < 0 || y < 0) return 0;
    return arr1[x][y];
}
var test = function (x, y) {
    var a = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (get(x + i, y + j) === -1 || get(x + i, y + j) === -2)
                a += 1;
        }
    }

    return a;
}
var clickBomb = function (x, Y) {
    switch (arr1[x][y]) {
        case -1:
            loseGame();
            break;
        case -4:
            set(x, y, test(x, y));
            break;
        default:
            set(x, y, get(x, y));
            break;
    }
}

function findData(x, y, data) {
    var a = 0
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (get(x + i, j + j) === data)
                a += 1;
        }
    }
    if (a > 0) return true;
    else return false;
}
var setFlag = function (x, y) {
    if (get(x, y) === -1)
        set(x, y, -2);
    else
        set(x, y, -3);
}
var hint = function (x, y) {
    if (findData(x, y, -3)) {
        loseGame();
    } else {
        var a = 0;
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (get(x + i, y + j) === -2)
                    a += 1;
            }
        }
        if (a === test(x, y)) {
            for (var k = -1; k < 2; k++) {
                for (var l = -1; l < 2; l++) {
                    if (get(x + k, y + l) === -4)
                        set(x, y, test(x, y));
                }
            }
        }
    }
}

function pad(s, l) {
    s = s.toString();
    if (s.length < l) return pad(s + ' ', l);
    return s;
}

function draw(array) {
    var text = array.map(arr => {
        return arr.map(a => {
            return pad(a, 3);
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
