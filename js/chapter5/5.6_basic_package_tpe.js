var str = new String("a simple text");
str.color = "red";
console.log(str.color);//red
console.log(typeof str);//object

//使用new调用基本包装类型的构造函数，与直接调用同名函数的转型函数不一样
/** 5.6.1 Boolean类型
 * 基本类型与引用类型的布尔值还有两个区别，typeof操作符对基本类型返回"boolean",而对引用类型返回"object"
 * 由于Boolean对象是Boolean类型的实例，所以使用instanceof测试Boolean对象返回true，测试基本类型的布尔值则返回false
 */
var falseObject = new Boolean(false);
var falseValue = false;
console.log(typeof falseObject);//Object
console.log(typeof falseValue);//Boolean
console.log(falseObject instanceof Boolean);//true
console.log(falseValue instanceof Boolean);//false

/**
 * 5.6.2 Number类型
 */
//toFixed()方法返回指定小数位的字符串,自带四舍五入
//toExponential()方法返回以指数表示法（e表示法）表示的数值的字符串形式,接收一个参数指定输出结果中的小数位数
//toPrecision()方法，接收一个参数，表示数值的所有数字位数
var num = 99;
console.log(num.toPrecision(1));
console.log(num.toPrecision(2));
console.log(num.toPrecision(3));

/**
 *  5.6.3 String类型
 */
/**
 * 1.字符方法，charAt()以单字符串的形式返回给定位置的那个字符和charCodeAt()返回字符编码,还可以使用方括号加数字索引来访问字符串的特定字符
 */
var stringValue = "hello world";
console.log(stringValue.charAt(8));
console.log(stringValue.charCodeAt(8));

/**
 * 字符串三个基于子字符串创建新字符串的方法，slice()、substr()和substring()，
 * 三个方法都返回被操作字符串的一个子字符串，而且都接收一或两个参数
 * 第一个指定子字符串的开始位置，第二个参数表示子字符串到哪里结束
 * silce()和substring()的第二个参数指定的是子字符串最后一个字符后面的位置，而substr()的第二个参数指定的是返回的字符个数，三个方法都不会修改原始字符串,如果传入的是负数，slice()方法会将传入的值与字符串长度相加，substr()方法将负的第一个参数加上字符串的长度，将负的第二个参数转换为0，substring()方法会将所有负值转换为0
 */
var strs = "hello world"