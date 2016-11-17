/*
<div class="popout">
    <div class="area">
        <div class="middle">
            <div class="head">
                <p>取個名字吧</p>
            </div>
            <div class="body">
                <p>來個與眾不同的名字?</p>
                <input type="text">
            </div>
            <div class="foot">
                <button>確定</button>
            </div>
        </div>
    </div>
</div>
*/


function Popout(title, callback){
    function dom(tagName, options) {
        var ele = document.createElement(tagName);
        if (options != undefined)
            for (var i in options) ele[i] = options[i];
        return ele;
    }
    var result = null;
    var element = dom('div', {className:"popout"}); 
    var area = dom('div', {className:"area"}); 
    var middle = dom('div', {className:"middle"}); 
    var head = dom('div', {className:"head"}); 
    var body = dom('div', {className:"body"}); 
    var foot = dom('div', {className:"foot"});
    var header = dom('p', {textContent:title});
    element.appendChild(area);
    area.appendChild(middle);
    middle.appendChild(head);
    middle.appendChild(body);
    middle.appendChild(foot);
    head.appendChild(header);

    var opened = false;

    this.show = function(){
        if(opened) document.body.removeChild(element);
        opened = true;
        document.body.appendChild(element);
        element.classList.remove("hide");
    }

    this.hide = function(){
        element.classList.add("hide");
    }

    this.close = function(){
        opened = false;
        element.classList.add("hide");
        setTimeout(function(){
            if(!opened) document.body.removeChild(element);
        }, 660);
    }

    var close = this.close;
    element.addEventListener("click", function(event){
        if(event.target == element) {
            close();
            report(null);
        }
    });

    this.bodyText = function(text){
        var element = dom('p', {textContent: text});
        body.appendChild(element);
        last = element;
        return this;
    }

    this.bodyInput = function(type, name){
        var input = dom('input', {type:type, name:name});
        body.appendChild(input);
        last = input;
        return this;
    }

    this.footText = function(text){
        var element = dom('p', {textContent: text});
        foot.appendChild(element);
        last = element;
        return this;
    }

    this.footButton = function(text, name){
        var btn = dom('button', {textContent: text, name: name});
        foot.appendChild(btn);
        btn.addEventListener('click', function(event){
            report(name);
        });
        last = btn;
        return this;
    }

    this.saves = {};
    this.save = function(name){
        this.saves[name] = last;
        return this;
    }

    var show = this.show;
    var saves = this.saves;
    function report(result){
        var data = {};
        [...element.querySelectorAll('input')].map(input=>{
            data[input.name] = input.value;
        });
        var get = null;
        if(callback instanceof Function)
        get = callback(result, data, saves);
        if(get=="show") show();
        else close();
    }
}