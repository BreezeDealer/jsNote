//5.7 Clobal对象
/**
 * 1.URI编码方法，encodeURI()和encodeURIComponent()方法，对URI进行编码,它们用特殊的UTF-8编码替换所有无效的字符
 * 前者对整个URI进行编码，而后者对URI中的某一段进行编码，而且会对它发现的任何非标准字符进行编码
 */
var uri = "http://www.wrox.com/illegal value.html#start";
console.log(encodeURI(uri));//除空格字符其他原封不动
console.log(encodeURIComponent(uri));

/**
 * decodeURI()和decodeURIComponent()方法解码，但是不会对%23做出任何处理，因为它不是由encodeURI()替换的，decodeURIComponent()方法可以解码任何特殊字符的编码
 */

//2.eval()方法，接受一个参数，即要执行的js字符串,通过eval()方法执行的代码可以被认为是包含该次调用的执行环境的一部分，eval()中创建的任何变量和代码都不会被提升，严格模式下会报错
eval("function sayHi(){ console.log('hi'); };");
sayHi();//hi

//取得GLobal对象的方法
var global = function(){
    return this;
}();

//5.7.2 Math对象
console.log(
    "Math.E:        " + Math.E + "\n" + //自然对数的底数，即常量e的值
    "Math.LN10:     " + Math.LN10 + "\n" + //10的自然底数
    "Math.LN2       " + Math.LN2 + "\n" + //2的自然对数
    "Math.LOG2E:    " + Math.LOG2E + "\n" + //以2为底e的对数
    "Math.LOG10E:   " + Math.LOG10E + "\n" + //以10为底e的对数
    "Math.PI:       " + Math.PI + "\n" + //π的值
    "Math.SQURT1_2: " + Math.SQRT1_2 + "\n" + //1/2的平方根
    "Math.SQURT2:   " + Math.SQRT2 //2的平方根
)

//求数组中最大的或最小值
var values = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(Math.max.apply(Math, values));

/**
 * 3. 舍入方法：
 * Math.ceil()执行向上舍入，总是将数值向上舍入最接近的整数
 * Math.floor()执行向下舍入，总是将数值向下舍入最接近的整数
 * Math.round()执行标准舍入，总是将数值四舍五入为最接近的整数
 */

//Math.random()方法返回大于等于0小于1的随机数
//值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)

//通过一个函数来计算可能值的总数和第一个可能的值
function selectFrom(lowerValue, upperValue){
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
console.log(selectFrom(2,10));//介于2和10之间的一个数值（包含2和10）