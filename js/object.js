var o = new Object();
var o = new Object;//有效，但是不推荐
//hasOwnProperty(propertyName),propertyName必须是个string
if(!o.hasOwnProperty("name")){  
    console.log("it has no name")
}