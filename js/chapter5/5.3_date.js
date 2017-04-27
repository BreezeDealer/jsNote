//使用Date()构造函数创建日期，需要传入时间的毫秒数，所以js提供了两个方法，Date.parse()和Date.UTC()方法
var now = new Date();
//Date.parse()方法接收一个表示日期的字符串参数，然后返回相应日期的毫秒数，美区浏览器支持的格式有"6/12/2004","January 12,2004","Tue May 25 2004 00:00:00 GMT-0700","2004-05-25T00:00:00"

var someDate = new Date(Date.parse("April 25, 2017"));
console.log(someDate);

//Date.UTC()方法也返回表示日期的毫秒数，它的参数分别是年份、基于0的月份、月中的哪一天（1到31）、小时数（0到23）

/**
 * 日期对象及其在不同浏览器中的实现有许多奇怪的行为。其中有一种倾向是将超
出范围的值替换成当前的值，以便生成输出。例如，在解析"January 32, 2007"
时，有的浏览器会将其解释为"February 1, 2007"。而Opera 则倾向于插入当前月
份的当前日期，返回"January 当前日期，2007"。也就是说，如果在2007 年9 月
21 日运行前面的代码，将会得到"January 21, 2007"（都是21 日）。
 */
var start = Date.now();
function doSomthing(a,b){
    return a+b;
}
doSomthing(1,2)
var stop = Date.now();
result = stop - start;
console.log(result);

var date1 = new Date(2007, 0, 1);
var date2 = new Date(2007, 1, 1);
console.log(date1 < date2);//true

//日期的格式化方式
var timer = new Date(Date.parse("2017-04-27T00:00:00+00:00"));
console.log(timer);

var times = new Date();
console.log(times.getTime())