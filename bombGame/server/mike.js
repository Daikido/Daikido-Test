var number=0;
var time=0;
exports.update=function(t){
    var delta = t-time;
    number-=delta*0.00001;
    time = t;
}
exports.click = function(){
    number+=1;
}

exports.getNumber = function(){
    return number;
}