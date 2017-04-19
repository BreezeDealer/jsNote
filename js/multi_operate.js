/**
 * @chapter 3.5.4
 * @theme 乘性操作符
 * 参与乘性计算的某个操作数不是数值，后台会使用Number()转换为数值
 * 1.乘法操作符遵循规则：
 * (1).如果是Infinity与0相乘，结果为NaN
 * (2).如果是Infinity与非0数值相乘，结果为Infinity或者-infinity，取决于有符号操作数的符号
 * (3).如果是Infinity与Infinity相乘，结果为Infinity
 * (4).如果有一个操作数不是数值，则在后台调用Number()转换成数值。在计算
 * 
 * 2.除法操作符遵循规则：
 * (1).如果只有一个操作符有符号，结果就是负数，商超过ECMAScript数值范围返回Infinity或-Infinity
 * (2).如果是Infinity被Infinity除，则结果为NaN
 * (3).如果是0/0，则结果为NaN
 * (4).如果是非零的有限数被零除，则结果是Infinity或-Infinity，取决于有符号操作符的符号
 * (5).如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有符号操作数的符号
 * 
 * 3.求模
 * (1).如果被除数是无穷大而除数是有限大的数值，则结果为NaN
 * (2).如果被除数是有限大的数值而除数是0，则返回NaN
 * (3).如果被除数是有限大的数值而除数是无穷大的数值，结果是被除数
 * (4).Infinity%Infinity == NaN
 * (5).被除数是0，则结果为0
 */
/**
 * 3.5.5  加性操作符
 * 遵循规则：
 * (1).有一个操作数是NaN，结果为NaN
 * (2).如果Infinity加-Infinity，结果为NaN
 * (3).如果有一个操作数是字符串，那么遵循以下规则：如果两个都是字符串，则将第二个操作数与第一个操作数拼接起来；如果只有一个操作数是字符串，则将两一个操作数转换为字符串，然后再讲两个字符串拼接起来；如果有一个操作数是对象、数值、布尔值，则调用他们的toString()方法取得字符串值，对于undefined和null分别调用String()函数取得字符串。
 */
var num1 = 5;
var num2 = 10;
var message = "The sum of 5 and 10 is " + num1 + num2;
console.log(message);//"The sum of 5 and 10 is 510"
/**
 * 减法，遵循规则：
 * 如果有一个操作数是字符串、布尔值、null或undefined，则在后台调用Number将其转换成数值，然后再执行减法计算。
 * 如果有一个操作数是对象，则调用valueOf()方法取得该对象的数值，如果没有valueOf()方法则调用toString()方法并将得到的字符串转化成数值。
 */
console.log(Infinity - Infinity);//NaN
console.log(-Infinity-(-Infinity));//NaN

var result1 = 5 - true;//4,因为true被转换成了1
var result2 = NaN - 1;//NaN
var result3 = 5 - "";//5
var result4 = 5 - null;//5

/**
 * 3.5.6关系操作符：<, >, <=, >=，遵循规则：
 * 如果两个操作数都是数值，则执行数值比较。
 * 如果一个操作数是数值，则将另一个操作数转换成一个数值，然后执行数值比较。
 * 如果都是字符串，则比较两个字符串对应的字符编码值。
 * 如果一个操作数是对象，则调用valueOf()方法比较结果。没有valueOf()则调用toString()方法。
 * 如果一个操作数是布尔值，则先将其转换成数值，然后比较。
 * （任何操作数与NaN进行关系比较，结果都是false）
 */
var result5 = "Brik" < "alphabet";
console.log(result5);//true