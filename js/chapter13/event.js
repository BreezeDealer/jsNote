/**
 * 跨浏览器的事件处理程序和事件对象
 */
var EventUtil = {
    addHandler: function(ele, type, handler){
        if(ele.addEventListener){
            ele.addEventListener(type, handler, false);
        }else if(ele.attachEvent){
            ele.attachEvent("on" + type, handler);
        }else{
            ele["on" + type] = handler;
        }
    },
    removeHandler: function(ele, type, handler){
        if(ele.removeEventListener){
            ele.removeEventListener(type, handler, false);
        }else if(ele.detachEvent){
            ele.detachEvent("on" + type, handler);
        }else{
            ele["on" + type] = null;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target ? event.target : event.srcElement;
    },
    //获取相关元素
    getRelatedTarget: function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    //将IE模型规范化为DOM方式，检测button属性
    getButton: function(event){
        if(document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    //跨浏览器取得keypress的字符编码
    getCharCode: function(event){
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    },
    //跨浏览器操作剪贴板
    getClipboardText: function(event){
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    setClipboardText: function(event, value){
        if(event.clipboardData){
            return even.clipboardData.setData("text/plain", value);
        }else if(window.clipboardData){
            return window.clipboardData.setData("text", value);
        }
    },
    //跨浏览器的鼠标滚轮事件
    getWheelDelta: function(event){
        if(event.wheelDelta){
            return event.wheelDelta;
        }else{
            return -event.detail * 40;
        }
    },
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
}
/**
 * 跨浏览器创建XHR
 */
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i,
                len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    console.log(ex);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else {
        throw new Error("No XHR object available.");
    }
}
//表单序列化
function serialize(form){
    var parts = [],
    field = null,
    i,
    len,
    j,
    optLen,
    option,
    optValue;
    for(i = 0, len=form.elements.length; i < len; i++){
        field = form.elements[i];
        switch(field.type){
            case "select-one":
            case "select-multiple":

                if(field.name.length){
                    for(j=0, optLen = field.options.length; j < optLen; j++){
                        option = field.options[j];
                        if(option.selected){
                            optValue = "";
                            if(option.hasAttribute){
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            }else{
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
            break;

            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;

            case "radio":
            case "checkbox":
                if(!field.checked){
                    break;
                }
            default:
                if(field.name.length){
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}
//自定义事件
function EventTarget(){
    this.handlers = {};
}
EventTarget.prototype = {
    contructor: EventTarget,
    addHandler: function(type, handler){
        if(typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i=0, len = handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler){
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i=0, len = handlers.length; i < len; i++){
                if(handlers[i] == handler){
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}
//拖放事件
var DragDrop = function(){
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;
    function handleEvent(event){
        //获取事件和目标
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        //确定事件类型
        switch(event.type){
            case "mousedown":
                if(target.className.indexOf("draggable") > -1){
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({
                        type:"dragstart", 
                        target: dragging, 
                        x: event.clientX, 
                        y: event.clientY
                    });
                }
                break;
            case "mousemove":
                if(dragging !== null){
                    //指定位置
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    //触发自定义事件
                    dragdrop.fire({
                        type:"drag", 
                        target: dragging, 
                        x: event.clientX, 
                        y: event.clientY
                    });
                }
                break;
            case "mouseup":
                dragdrop.fire({
                    type:"dragend", 
                    target: dragging, 
                    x: event.clientX, 
                    y: event.clientY
                });
                dragging = null;
                break;
        }
    };
    //公共接口
    dragdrop.enable = function(){
        EventUtil.addHandler(document, "mousedown", handleEvent);
        EventUtil.addHandler(document, "mousemove", handleEvent);
        EventUtil.addHandler(document, "mouseup", handleEvent);            
    },
    dragdrop.disable = function(){
        EventUtil.removeHandler(document, "mousedown", handleEvent);
        EventUtil.removeHandler(document, "mousemove", handleEvent);
        EventUtil.removeHandler(document, "mouseup", handleEvent);            
    }
    return dragdrop;

}();
