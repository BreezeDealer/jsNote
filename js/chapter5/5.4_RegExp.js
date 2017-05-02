/**
 * 5.4 正则表达式
 * 元字符包括： ( [ { \ ^ $ | ? * + . } ] )
 * RegExp的实例属性：
 *      global：布尔值
 *      ignoreCase：布尔值
 *      lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从0开始
 *      multiline：布尔值
 *      source：正则表达式的字符串表示，按照字面量姓氏而非传入构造函数中的字符串模式返回
 */
/**
 * 5.4.2 RegExp实例方法
 * exec()，参数为要应用的字符串，然后返回包含第一个匹配项信息的数组；
 * 或者在没有匹配情况下返回null，返回的数组包含两个额外的属性，index（表示匹配项在字符串中的位置），input表示应用正则表达式的字符串。
 */
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;

var matches = pattern.exec(text);
console.log(matches.index);
console.log(matches.input);
console.log(matches[0]);
console.log(matches[1]);
console.log(matches[2]);

var text1 = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches1 = pattern1.exec(text1);
console.log(matches1.index);
console.log(matches1[0]);
console.log(pattern1.lastIndex);

var pattern2 = /.at/g;
var matches2 = pattern2.exec(text1);
console.log(matches2.index);
console.log(matches2[0]);
console.log(pattern2.lastIndex);

matches = pattern2.exec(text1);
console.log(matches.index);
console.log(matches[0]);
console.log(pattern2.lastIndex)

/**
 * test方法，接受一个字符串参数,返回值为true或false
 */
var txt1 = "000-00-0000";
var patterns1 = /\d{3}-\d{2}-\d{4}/;
if(patterns1.test(txt1)){
    console.log("The pattern was matched");
}

/**
 * 5.4.3 RegExp构造函数属性
 * input $_ 最近一次要匹配的字符串。Opera未实现此属性
 * lastMatch $& 最近一次的匹配项。Opera未实现此属性
 * lastParen $+ 最近一次匹配的捕获组。Opera未实现此属性
 * leftContext $` input字符串中lastMatch之前的文本
 * multiline $* 布尔值，表示是否所有表达式都使用多行模式。IE和Opera未实现此属性
 * rightContext $' Input字符串中lastMatch之后的文本
 */
var t1 = "this has been a short summer";
var p1 = /(.)hort/g;
/**
 * 注意，Opera不支持input、lastMacth、lastParen和multiline属性
 * IE不支持multiline属性
 */
if(p1.test(t1)){
    console.log(RegExp.input);
    //console.log(RegExp.$_);
    console.log(RegExp.leftContext);
    console.log(RegExp.rightContext); 
    console.log(RegExp.lastMatch);
    console.log(RegExp.lastParen);
    console.log(RegExp.multiline);
}