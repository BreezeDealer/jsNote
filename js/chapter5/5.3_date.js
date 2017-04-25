var now = new Date();
//Date.parse()方法接收一个表示日期的字符串参数，然后返回相应日期的毫秒数，美区浏览器支持的格式有"6/12/2004","January 12,2004","Tue May 25 2004 00:00:00 GMT-0700","2004-05-25T00:00:00"

var someDate = new Date(Date.parse("April 25, 2017"));
console.log(someDate);

//Date.UTC()方法也返回表示日期的毫秒数，它的参数分别是年份、基于0的月份、月中的哪一天（1到31）、小时数（0到23）