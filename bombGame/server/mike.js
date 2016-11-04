var number=0;
number-=0.1;
exports.click = function(){
    number+=1;
}

exports.getNumber = function(){
    return number;
}