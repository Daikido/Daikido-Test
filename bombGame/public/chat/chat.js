// by Hans
function ChatSystem(elementId) {
    var element = document.getElementById(elementId);
    this.rooms = [];

    function dom(tagName, options, callback) {
        var ele = document.createElement(tagName);
        if (options != undefined)
            for (var i in options) ele[i] = options[i];
        if (callback != undefined) callback(ele);
        return ele;
    }

    function getLineElement(title, content, self) {
        var div = dom('div', { className: "line" });
        div.appendChild(dom('div', {
            className: "block " + (self ? "right" : "left"),
            innerHTML:
            `<span class="title">${title}</span>` +
            `<span class="content"> : ${content}</span>`
        }));
        return div;
    }

    function Room(name) {
        var box = dom('div', { className: "chatBox" });
        var head = dom('div', { className: "head" });
        var title = dom('p', { textContent: name });
        var body = dom('div', { className: "body" });
        var foot = dom('div', { className: "foot" });
        var input = dom('input', { type: "text" });
        box.appendChild(head);
        box.appendChild(body);
        box.appendChild(foot);
        head.appendChild(title);
        foot.appendChild(input);

        this.getTitle = function () { return title.textContent; }
        this.setTitle = function (text) { title.textContent = text; }

        this.write = function (name, content, self) {
            body.appendChild(getLineElement(name, content, self));
            body.scrollTop = body.scrollHeight
        }

        var Readers = [];

        this.read = function (callback) {
            Readers.push(callback);
        }

        input.addEventListener("keydown", function (event) {
            if (event.isTrusted === false) return;
            if (event.key == "Enter" && input.value.length > 0) {
                Readers.map(x=>x(input.value));
                input.value = "";
            }
        });
        this.element = box;
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