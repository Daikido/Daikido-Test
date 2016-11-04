var express = require('express')
var app = express();

app.get('/', function(req, res){
    res.send("Hello");
});

app.get('/aboutme', function(req, res){
    res.send("<h1>i am mike</h1>");
})

app.post('/', function(req, res){
    res.send("you are using post");
})
app.use(express.static(__dirname+'/image'));

app.listen(8080,'localhost', function(){
    console.log("started");
});