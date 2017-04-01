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
//3.Number(在进行算术时，所有八进制和十六进制表示的数值都会被转换成十进制数值)
var intNum = 55;//整数
    //八进制字面值的第一位必须是零（0），数字序列是（0~7）
    var octalNum1 = 070; console.log(octalNum1);//56
    var octalNum2 = 079; console.log(octalNum2);//无效的八进制 解析为79
    var octalNum3 = 08; console.log(octalNum3);//无效的八进制 解析为8
    //十六进制，十六进制字面值前两位必须是0x，后跟任何十六进制数字（0~9及A~F，字母不分大小写）
    var hexNum1 = 0xA; console.log(hexNum1); //十进制的10
    var hexNum2 = 0x1f; console.log(hexNum2); //十进制的31
    //浮点数
    var floatNum = 3.125e7; //等于31250000
    var floatnum2 = 3e-17; //等于0.00.....03
        //浮点数的最高精度是17位小数，
        console.log(0.1+0.2); //0.3........4
    //es不能保存所有数值，最大值存在Number.MAX_VALUE里，最小值存在Number.MIN_VALUE
        console.log(Number.MAX_VALUE);//1.7976931348623157e+308
        console.log(Number.MIN_VALUE);//5e-324
    //isFinite()函数判断一个数值是否有限
    //NaN,isNaN()判断参数值是否"数值"，isNaN会先将参数转换成数值，不能转换成数值的值就会返回true。
    Number(0);//0
    Number("010");//10
    Number("");//0
    Number("1.1");//1.1
    Number(null);//0
    Number(true);//1
    Number(undefined);//NaN
    Number(0123);//123
    Number(0xf);//15
//实际应用中，Number（）方法类型复杂，更多使用ParseInt(),但是在es3和es5中对于转换"070"类似的字符串有歧义，es3会转换成56（八进制），es5会转成70，所以parseInt（）接受第二个参数制定转换的基数。
    parseInt("070");//70
    parseInt("070", 8);//56
    //parseFloat()无论如何都会忽略字符串前导的0，没有第二个参数指定基数的用法。
    parseFloat("20.1.12");//20.1
    parseFloat("3.125e7");//31250000