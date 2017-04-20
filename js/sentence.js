

/**
 * label语句，语法：
 * label:statement
 */
/*start: for(i = 0; i < 10 ; i++) {
    console.log(i)
}*/
//break和continue语句，break语句立即退出循环，强制继续执行循环后面的语句，continue语句立即退出循环，但退出后会从循环的顶部继续执行
var num5 = 0;
for(var i=1 ;i<10 ;i++){
    if(i % 5 == 0){
        break;
    }
    num5++;
}
console.log(num5);//4

var num1 = 0;
for(var i=1 ;i<10 ;i++){
    if(i % 5 == 0){
        continue;
    }
    num1++;
}
console.log(num1);//8

//label语句和break、continue语句联合使用，从而返回代码中特定的位置
//在i==5之前内部循环都会进行10次，等到i==5时内部循环只进行5次就退出外面的总循环，所以num结果为55
var num3 = 0;
//debugger;
outermost:
for(var i=0; i<10; i++){
    for(var j=0; j<10; j++){
        if(i ==5 && j == 5){
            break outermost;
        }
        num3++;
    }
}
console.log(num3);//55

//在i==5之前内部循环都是进行十次，等到i==5时，在j==5之前循环只进行5次就退出外部循环再从循环头开始进行，然后在6<=i<10时，内部循环对于每个i都进行十次循环直到i=10结束循环。
var num4 = 0;
//debugger;
outermost2:
for(var i = 0; i < 10; i++){
    for(var j = 0; j <10; j++){
        if(i == 5 && j ==5){
            continue outermost2;
        }
        num4++;
    }
}
console.log(num4);//95

/**
 * 3.6.8 with语句，作用是将代码的作用于设置到一个特定的对象中。
 * 语法：with (expression) statement;
 * 严格模式下不允许使用with语句
 */
/*
with(location){
    var qs = search.substring(1);
    var hostName = hostname;
    var url = href;
}*/

/**
 * 3.6.9 switch语句
 * 语法：
 *      switch (expression) {
 *          case value: statement
 *              break;
 *          case value: statement
 *              break;
 *             default: statement
 *      }
 * 每一种情形(case)的含义是：如果表达式等于这个值(value)，则执行后面的语句(statement)，break关键字会导致代码执行流跳出switch语句。最后的default关键字则用于在表达式不匹配任何一种情形的时候，执行机动代码。
 * switch语句在做比较值时使用的是全等操作符。
 */
var i = 26;
switch (i) {
    case 25:
        //合并两种情形
    case 26:
        console.log("it's 25 or 26");
        break;
    case 35:
        console.log("it's 35");
        break;
    case 45:
        console.log("it's 45");
        break;
    default:
        console.log("nothing happens");
}

var num = 25;
switch (true) {
    case num < 0:
        console.log("less than 0");
        break;
    case num >= 0 && num <= 10:
        console.log("between 0 and 10");
        break;
    case num > 10 && num <= 20:
        console.log("between 10 and 20");
    default:
        console.log("more than 20")
}