//函数表达式定义函数
var sum = function(num1, num2){
    return sum1 + sum2;
};
//使用Function构造函数，最后一个参数被看成是函数体
var min = new Function("num1", "num2", "return num1 - num2");
min(2,1);
//函数是对象，函数名是指针,函数没有重载，声明两个同名函数，结果是后面的覆盖了前面的函数
var addSomeNumber = function(num){
    return num + 100;
}
addSomeNumber = function(num){
    return num + 200;
}
var result = addSomeNumber(20);//220
console.log(result);//

/**
 * 5.5.2 函数声明和函数表达式
 * 解析器会率先读取函数声明，至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被执行
 */
/*console.log(sumUp(10,10));//会报错
var sumUp = function(num1, num2){
    return num1 + num2;
}*/

/**
 * 5.5.3 作为值的函数，把函数作为参数传递给另一个函数，而且可以将一个函数的结果作为另一个函数的结果返回
 */
function callSomeFunction(someFunction, someArgument){
    return someFunction(someArgument);
}

function add10(num){
    return num + 10;
}

var result1 = callSomeFunction(add10, 10);
console.log(result1);//

function getGreeting(name){
    return "Hello, " + name;
}
var result2 = callSomeFunction(getGreeting, "Nicolas");
console.log(result2);

//从一个函数中返回另一个函数
function createComparisonFunction(propertyName){
    return function(object1, object2){
        value1 = object1[propertyName];
        value2 = object2[propertyName];

        if(value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
    };
}
var data = [{name: "Zachary", age: 28}, {name: "Nicolas", age: 29}];

data.sort(createComparisonFunction("name"));
console.log(data[0].name);//Nicolas
data.sort(createComparisonFunction("age"));
console.log(data[0].name);//Zachary

/**
 * 5.5.4 函数内部的属性
 * arguments和this,arguments对象还有一个callee属性，该属性是一个指针，指向拥有这个arguments对象的函数
 */

//这是一个阶乘函数，但是函数的执行和函数名耦合在一起了
function factorial(num){
    if(num <=1){
        return 1;
    }else{
        return num * factorial(num-1);
    }
}
console.log(factorial(1))
console.log(factorial(2))
console.log(factorial(3))
console.log(factorial(4))
//消除耦合
function factorial(num){
    if(num <1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}

//this引用的是函数以执行的环境对象——或者可以说是this值(当在网页的全局作用域中调用函数时，this对象引用的就是window)
//另一个函数对象的属性：caller，保存着调用当前函数的函数的引用，在全局作用域中调用当前函数，它的值为null
//以下代码会显示outer函数的源代码，为了实现松散的耦合，可以通过arguments.callee.caller来访问相同的信息
function outer(){
    inner();
}
function inner(){
    console.log(inner.caller);
    console.log(arguments.caller);//arguments.callee在严格模式下访问报错，但是在非严格模式下始终是undefined
    console.log(arguments.callee.caller);
}
outer();

/**
 * 5.5.5 函数属性和方法
 * length和prototype，length属性表示函数希望接收的命名参数的个数
 * 每个函数都包含两个非继承而来的方法：apply()和call()，两个方法都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。
 * apply()方法接收两个参数，一个是其中运行函数的作用域，另一个是参数数组，其中，第二个参数可以是Array的实例，也可以是arguments对象
 */
function sums(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    return sums.apply(this, arguments);
}

function callSum2(num1, num2){
    return sums.apply(this, [num1, num2]);
}
console.log(callSum1(10,10));
console.log(callSum2(10,10));

/**
 * call()方法与apply()方法相同，区别在于接收参数的方式不同，call()方法第一个参数是this,其余参数都直接传递给函数，传递个函数的参数必须逐个列出来。
 */

function sumUp1(num1, num2){
    return num1 + num2;
}
function callSumup1(num1, num2){
    return sumUp1.call(this, num1, num2);
}
console.log(callSumup1(10,10));//20

//apply和call可以扩充函数赖以运行的作用域
global.color = "red";
var o = { color: "blue"};
function sayColor(){
    console.log(this.color);
}
sayColor(this);//red
sayColor.call(global);//red
sayColor.call(o);//blue

//bind()方法，创建一个函数的实例，其this值会被绑定到传给bind()函数的值
global.gender = "male";
var g = { gender: "female" };
function sayGender(){
    console.log(this.gender);
}
var objectSayGender = sayGender.bind(g);
objectSayGender();//24