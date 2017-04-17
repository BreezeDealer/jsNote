/**
 * @chapter 3.5.3
 * @theme 布尔操作符
 * 布尔操作符一共有3个：与或非。
 */
//1.逻辑非，用符号(!)表示，可以应用于ECMAScript中的任何值。无论这个值是什么类型都会返回一个布尔值。
!"200"; //false
//2.逻辑与，用符号(&&)表示
/**
 * 再有一个操作数不是布尔值的情况下，逻辑与操作不一定返回布尔值。遵循以下规则：
 * (1).第一个操作数是对象，则返回第二个操作数
 * (2).如果第二个操作数是对象，则只有在第一个操作数的求值结果为true才会返回该对象
 * (3).如果两个都是对象，则返回第二个操作数。
 * (4).如果有一个操作数是null,则返回null
 * (5).如果有一个操作数是NaN，则返回NaN
 * (6).如果有一个操作数是undefined，则返回undefined
 * 因为逻辑与操作属于短路操作，如果第一个操作数能决定结果，那么就不会对第二个操作数求值。如果第一个操作数是FALSE，则是无论第二个操作数是什么值，结果都不可能再是true，
 */
var found = true;
//var resultFound = (found && someUndefinedVariable);//这里会报错，因为found为true，继续判断someUndefinedVariable没有声明
//console.log(resultFound); //这一行不会执行

var found2 = false;
var resultFound2 = (found2 && someUndefinedVariable);//不会发生错误
console.log(resultFound2);//false

/**
 * 2.逻辑或，用符号（||）表示，与逻辑与操作相似，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值。遵循规则：
 * (1).如果第一个操作数是对象，则返回第一个操作数
 * (2).如果第一个操作数求值结果为false，则返回第二个操作数
 * (3).如果两个操作数都是对象，则返回第一个操作数
 * (4).如果两个都是null,NaN,nndefined,则分别返回null,NaN,undefined。
 * 逻辑或操作符也是短操作符，当地一个结果为true时，就不会对第二个操作数求值了。
 * 可以用逻辑或的特性来避免变量赋null或undefined
 */
var found3 = true;
var resultFound3 = (found3 || someUndefinedVariable); //不会报错

var found4 = false;
var resultFound4 = (found4 || someUndefinedVariable);//会报错，因为found4为false，继续对someUndefinedVariab求值，未声明。

var myObject = preferredObject || backupObject;//变量会赋予等号后面两个值中的一个。preferredObject会优先赋值给myObject，当preferredObject为null，则backupObject的值会赋给myObject。