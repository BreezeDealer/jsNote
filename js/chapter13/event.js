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
