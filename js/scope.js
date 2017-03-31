//"use strict"
function test(){
     message = "hi"; //global var
}
test();
console.log(message);

/**
 * var定义局部变量，省略var则可以定义全局变量，但是在严格模式下会报referenceError错误
 */
console.log(typeof /ada/);
