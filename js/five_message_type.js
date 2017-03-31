/**
 * js五种简单数据类型，undefined，NULL，Boolean，number，string，以及一种复杂数据类型object
 */
//"use strict" 八进制字面值在严格模式下会报错
//1.undefined
var message;
console.log("1" + (message == undefined));//true
var test = undefined;
console.log("2" + (test == undefined));
//包含undefined值的变量和未定义的变量不一样，如
var message1;
//var age;
console.log(message1);
//console.lgo(age);//ReferenceError: age is not defined;
//但是两个变量的type类型居然是一样的
console.log((typeof message1) == (typeof age));//true

//2.Null
var car = null;
console.log(typeof car); //object
console.log(undefined == null); //true
//3.Boolean
var message2 = "hello world!";
var message2AsBoolean = Boolean(message2);
console.log(message2AsBoolean);//true
//Number
var intNum = 55;//整数
    //八进制字面值的第一位必须是零（0），数字序列是（0~7）
var octalNum1 = 070; console.log(octalNum1);//56
var octalNum2 = 079; console.log(octalNum2);//无效的八进制 解析为79
var octalNum3 = 08; console.log(octalNum3);//无效的八进制 解析为8
    //十六进制，十六进制字面值前两位必须是0x，后跟任何十六进制数字（0~9及A~F，字母不分大小写）
var hexNum1 = 0xA; console.log(hexNum1); //十进制的10
var hexNum2 = 0x1f; console.log(hexNum2); //十进制的31