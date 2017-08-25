self.onmessage = e =>{
    var data = e.data;
    data.sort((a, b) =>{
        return a - b;
    });
    self.postMessage(data);
}
console.log(self);
console.log("this is required js file.");
importScripts("test.js");