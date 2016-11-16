// by Hans

function Chat(elementId){

    function Room(name){
        this.name = name;
    }

    function getLineElement(title, content, self){
        var div = document.createElement('div');
        div.classList.add('block');
        div.classList.add(self?"right":"left");
        div.innerHTML = `<span class="title">${title}</span><span class="content">${content}</span>`;
        return div;
    }


    var element = document.getElementById(elementId);
    this.NewRoom = function(name){
        
    }
}