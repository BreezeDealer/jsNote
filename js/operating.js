//一元操作符，只能操作一个值的操作符
var a = 12;
var c = a++;
console.log(c);//12
var d = ++a;
console.log(d);//14
/**
 * 递增和递减操作符遵循规则：
 * 1.应用于一个包含有效数字的字符串时，先转换成数字在执行运算，字符串变量变为数值变量
 * 2.应用于一个不包含有效数字的字符串时，将变量转换成为NaN（不是数字，但是类型是number）
 * 3.应用于布尔值先转变成0或1，然后在运算，布尔值转变成了数值变量
 * 4.应用于浮点数，执行加减1的操作
 * 5.引用于对象先调用valueOf()方法，取得一个可供操作的值。如果结果是NaN，则在调用头String()方法后在应用前面的规则。对象变量变成了数值变量。
 */
var s1 = "2";
console.log(++s1);//3
var s2 = "z";
console.log(++s2);//NaN
var b = false;
console.log(++b);//1
var f = 1.1;
console.log(++f);//2.1
var o = {
    valueOf: function() {
        return -1;
    }
};
console.log(++o);//0
