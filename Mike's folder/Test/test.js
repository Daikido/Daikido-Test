var express = require('express')
var app = express();

app.get('/', function(req, res){
    res.send("Hello");
});

app.get('/aboutme', function(req, res){
    res.send("i am mike");
})

app.post('/', function(req, res){
    res.send("you are using post");
})

app.listen(8080,'localhost', function(){
    console.log("started");
});