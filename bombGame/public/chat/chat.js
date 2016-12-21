// by Hans

// 物件宣告：對話系統 elementId: 要用來當作容器的元素id
function ChatSystem(elementId) {
    var element = document.getElementById(elementId);
    this.rooms = [];
    var rooms = this.rooms;

    // 用來產生元素的工具 tagName:標籤名稱 options:選項
    function dom(tagName, options) {
        var ele = document.createElement(tagName);
        if (options != undefined)
            for (var i in options) ele[i] = options[i];
        return ele;
    }

    // 取得對話單行元素 name:對話傳送者 content:傳送內容 self:是否是自己(決定文字靠右或靠左)
    function getLineElement(name, message, self, master) {
        var div = dom('div', { className: "line" });
        var bg = dom('div', { className: "bg" });
        var block = dom('div', {className: "block " + (self ? "right" : "left")});
        
        var title = dom('span', {className:"title", textContent:name});
        var content = dom('span', {className:"content", textContent:"："+message});
        
        if(message.substr(0,4)=='img '){
            content = dom('img', {src:message.substr(4)});
        }
        
        if(master===true) title.style.borderBottomColor = "green";
        block.appendChild(bg);
        block.appendChild(title);
        block.appendChild(content);
        div.appendChild(block);
        return div;
    }

    function infoLineElement(text){
        var div = dom('div', { className: "line" });
        div.appendChild(dom('div', { className: "info",
            innerHTML:`<span class="content">${text}</span>`
        }));
        return div;
    }

    // 物件宣告：對話房間 name:房間名稱
    function Room(name) {
        this.name = name;
        var box = dom('div', { className: "chatBox" }); // 本體
        var head = dom('div', { className: "head" });   // 標頭
        var title = dom('p', { textContent: name });    // 標投文字
        var body = dom('div', { className: "body" });   // 主體
        var foot = dom('div', { className: "foot" });   // 結尾
        var input = dom('input', { type: "text", placeholder:"輸入訊息..." });     // 輸入框
        box.appendChild(head);
        box.appendChild(body);
        box.appendChild(foot);
        head.appendChild(title);
        foot.appendChild(input);

        // 取得以及設定標頭
        this.getTitle = function () { return title.textContent; }
        this.setTitle = function (text) { title.textContent = text; }

        // 寫入內容 name:發送者 content:發送內容 self:是否是自己(決定文字靠右或靠左)
        this.write = function (name, content, self, master) {
            body.appendChild(getLineElement(name, content, self, master));
            body.scrollTop = body.scrollHeight;
            
        }
        this.info = function(text){
            body.appendChild(infoLineElement(text));
            body.scrollTop = body.scrollHeight;
        }
        // 存放所有讀者，類型為function(content) 於使用者在輸入文字框時呼叫
        var Readers = [];

        // 註冊讀者，類型為function(content) 於使用者在輸入文字框時呼叫
        this.read = function (callback) {
            Readers.push(callback);
        }

        // 註冊輸入文字事件
        input.addEventListener("keydown", function (event) {
            if (event.isTrusted === false) return;
            if (event.key == "Enter" && input.value.length > 0) {
                // 呼叫所有讀者閱讀輸入框內容
                for(var i in Readers){
                    if(Readers[i](input.value)=="break") break;
                }
                input.value = ""; // 清空輸入框
            }
        });
        this.element = box; // 元素為本體

        this.close = function(){
            var index = rooms.indexOf(this);
            rooms.splice(index, 1);
            element.removeChild(this.element);
        }
        this.close.exe = true;

        rooms.push(this);
        element.appendChild(this.element);
    }

    function newRoom (name, socket) {
        var room = new Room(name);
        room.read(function(data){
            if(data[0]=='/'){
                var command = data.substr(1);
                var name = command.split(' ')[0];
                if(room[name]!=undefined && room[name].exe===true) {
                    room[name](...command.split(' ').splice());
                    return "break";
                }
            }
        });
        room.read(function(data){
            socket.emit('message', {name: room.name, message: data});
        });
        return room;
    }
    this.newRoom = newRoom;
    var users = {};

    this.connect = function(socket){
        socket.on('message', function(data){
            //if(data.room==myName) return;
            var target = rooms.filter(r=>r.name==data.room);
            if(target.length==0) target.push(newRoom(data.room, socket));
            var room = target.map(r=>{
                r.write(data.name, data.message, data.name==myName, data.master);
            });
        });

        socket.on('users', function(data){
            console.log(data);

            for(var i in data){
                if(users[i]==undefined) {
                    users[i] = data[i];
                    var target = rooms.filter(r=>r.name==data[i].name);
                    if(target.length==0) newRoom(data[i].name, socket).info("上線");
                    else target.map(room=>room.info("上線"));
                }
            }
            for(var i in users){
                if(data[i]==undefined){
                    rooms.filter(r=>r.name==users[i].name).map(r=>r.info("離線 輸入 /close 關閉視窗"));
                    delete users[i];
                }
            }
        });
    }


    var myName;
    this.setName = function(name){
        myName = name;
    }
}