var number=0;
var time=0;
exports.update=function(t){
    var delta = t-time;
  
    time = t;
}
exports.click = function(){
    number+=1;
}

exports.getNumber = function(){
    return number;
}