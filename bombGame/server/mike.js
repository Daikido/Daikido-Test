var number=0;
var time=0;
exports.update=function(t){
    var delta = t-time;
  
    time = t;
}
exports.click = function(n){
    number+=n;
}

exports.getNumber = function(){
    return number;
}