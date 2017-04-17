//
console.log("123\n" +"456") //456换行
console.log("hello \t");
var text = "This is the letter sigma: \u03a3";
console.log(text + ".length =" +text.length);
var text = "a"
//转换为字符串，数值，布尔值，对象，字符串都有toString()方法，null和undefined没有这个方法。
var age = 11;
var ageAsString = age.toString();
var nullTest = null, undefinedTest = undefined;
//console.log(nullTest.toString());//报错
//console.log(undefinedTest.toString(); 报错
var num = 10;
console.log(num.toString());//10
console.log(num.toString(2));//1010
console.log(num.toString(8));//12
console.log(num.toString(10));//10
console.log(num.toString(16));//a
//String() method,string as param;
String(10);//10
String(true);//true
String(null);//null
String(undefined);//undefined