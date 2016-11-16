// by Hans

// 物件宣告：對話系統 elementId: 要用來當作容器的元素id
function ChatSystem(elementId) {
    var element = document.getElementById(elementId);
    this.rooms = [];

    // 用來產生元素的工具 tagName:標籤名稱 options:選項
    function dom(tagName, options) {
        var ele = document.createElement(tagName);
        if (options != undefined)
            for (var i in options) ele[i] = options[i];
        if (callback != undefined) callback(ele);
        return ele;
    }

    // 取得對話單行元素 name:對話傳送者 content:傳送內容 self:是否是自己(決定文字靠右或靠左)
    function getLineElement(name, content, self) {
        var div = dom('div', { className: "line" });
        div.appendChild(dom('div', {
            className: "block " + (self ? "right" : "left"),
            innerHTML:
            `<span class="title">${name}</span>` +
            `<span class="content"> : ${content}</span>`
        }));
        return div;
    }

    // 物件宣告：對話房間 name:房間名稱
    function Room(name) {
        var box = dom('div', { className: "chatBox" }); // 本體
        var head = dom('div', { className: "head" });   // 標頭
        var title = dom('p', { textContent: name });    // 標投文字
        var body = dom('div', { className: "body" });   // 主體
        var foot = dom('div', { className: "foot" });   // 結尾
        var input = dom('input', { type: "text" });     // 輸入框
        box.appendChild(head);
        box.appendChild(body);
        box.appendChild(foot);
        head.appendChild(title);
        foot.appendChild(input);

        // 取得以及設定標頭
        this.getTitle = function () { return title.textContent; }
        this.setTitle = function (text) { title.textContent = text; }

        // 寫入內容 name:發送者 content:發送內容 self:是否是自己(決定文字靠右或靠左)
        this.write = function (name, content, self) {
            body.appendChild(getLineElement(name, content, self));
            body.scrollTop = body.scrollHeight
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
                Readers.map(reader=>reader(input.value));     // 呼叫所有讀者閱讀輸入框內容
                input.value = ""; // 清空輸入框
            }
        });
        this.element = box; // 元素為本體
    }

    this.NewRoom = function (name) {
        var room = new Room(name);
        this.rooms.push(room);
        element.appendChild(room.element);
        var allRooms = this.rooms;
        room.read(function(data){
            allRooms.map(r=>r.write(room.getTitle(), data, r==room));
        });
    }
}