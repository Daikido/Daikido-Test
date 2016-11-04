var ok = document.getElementById("ok");

function update(data){
    ok.innerText = data;
}

var btn = document.getElementById("btn");
var btm=document.getElementById("btm");
btn.onclick = function(){
    click(1);
}
btm.onclick = function(){
    click(-1);
}