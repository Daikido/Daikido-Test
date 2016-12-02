var input = document.querySelector("#input");
var output = document.querySelector("#output");
var button = document.querySelector("#solve");


button.onclick = function(){
    output.value=solve(input.value);
}

function solve(data){
    var d = new DataClass("temp");
    d.addAttribute("name", "string");
    d.addAttribute("score", "number");
    var result = d.parse(data);
    return JSON.stringify(result);
}