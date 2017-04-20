//ECMAScript 函数没有重载
function sumUp(){
    var sum = 0;
    if(arguments.length == 1){
        sum = arguments[0];
    }else{
        for(var i = 0; i < arguments.length; i++){
            sum += parseInt(arguments[i]);
        }
    }
    console.log(sum);
}
sumUp()
sumUp(1);
sumUp(1,2)
sumUp(1,2,3,4)

/**
 * arguments的值永远与对应命名参数的值保持同步。
 */
//"use strict"
function add(num1,num2) {
    arguments[1] = 10;
    console.log(arguments[0] + num2);
    console.log("the value of num2 is " + num2)
}
add(1,30);//20，因为第二个参数的值被修改了。
add(1);//the value of num2 is undefined,只有一个参数，第二个参数被赋予undefined值，而修改arguments[1]并不会生效。因为arguments的长度是由传入参数的个数所决定的。