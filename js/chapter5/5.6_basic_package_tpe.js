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
var strs = "hello world";
console.log(strs.slice(-3));//rld
console.log(strs.substr(-3));//rld
console.log(strs.substring(-3));//helllo wolrd

console.log(strs.slice(3,-4));//lo w
console.log(strs.substr(3,-4));//"",空字符串
console.log(strs.substring(3,-4));//hel

//3.字符串位置方法indexOf()和lastIndexOf(),从一个字符串中搜索给的的子字符串，然后返回子字符串的位置，两个方法都接收第二个参数，表示从字符串的那个位置开始搜索，使用循环调用来找到所有匹配的字符串
var strsValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = strsValue.indexOf("e");
while(pos > -1){
    positions.push(pos);
    pos = strsValue.indexOf("e", pos + 1);
}
console.log(positions);

//4.trim()方法，创建一个字符串的副本，删除前置后缀的所有空格，返回结果
var strsValue2 = "      hello wolrd      ";
var trimmedStringValue = strsValue2.trim();
console.log(strsValue2);
console.log(trimmedStringValue);

//5.字符串大小写转换方法,toLowerCase()、toLocaleLoverCase()、toUpperCase()和toLocaleUpperCase()方法

/**
 * 6.字符串的模式匹配方法
 * 1.match()，在字符串上调用这个方法，本质与RegExp的exec()方法相同
 */
var text2 = "cat, bat, sat, fat";
var pattern2 = /.at/;
var match2 = text2.match(pattern2);
console.log(match2);
console.log(match2[0]);//cat
console.log(match2.index);0
console.log(match2.input);//cat,bat,sat,fat
console.log(pattern2.lastIndex);//0

/**
 * search()方法，返回字符串中第一个匹配项的索引，始终是从字符串开头向后查找模式
 */
var searchText = "cat, bat, fat, sat";
var searchPosition = searchText.search(/at/);
console.log(searchPosition);

/**
 * replace()方法，接收两个参数：第一个参数可以是字符串或者一个函数，如果第一个参数是字符串，那么只会替换第一个子字符串，想要替换所有子字符串，唯一方法使用正则表达式，而且要指定全局(g)标志。
 */
var replaceText = "cat, bat, sat, fat";
var replaceResult = replaceText.replace("at", "ond");
console.log(replaceResult);//cond, bat, sat, fat

replaceResult = replaceText.replace(/at/g,"bond");
console.log(replaceResult);//cond ,bond ,sond, fond

/**
 * replace()方法的第二个参数是字符串，那么可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到字符串中
 */
var textSpecial = "cat, bat, sat, fat";
var resultSpecial = textSpecial.replace(/(.at)/g, "word ($01)");
console.log(resultSpecial);//word (cat), word (bat), word (sat), word(fat)

/**
 * replace()方法的第二个参数是函数时，在只有一个匹配项时，会向这个函数传递3个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串。
 * 在正则表达式中定义楽多个捕获组时，传递给函数的依次是模式的匹配项、第一个捕获组的匹配项、第二个匹配项······，但是最后两个参数仍然是模式的匹配项在字符串中的位置和原始字符串。这个函数返回一个字符串，表示该被替换的匹配项使用函数作为replace()方法的第二个参数可以实现更加精细的替换操作
 */
function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
        switch(match){
            case "<" :
                return "&lt;";
            case ">" :
                return "&gt;";
            case "\"" :
                return "&quot;";
            case "&" :
                return "&amp;";
        }
    })
}

console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));