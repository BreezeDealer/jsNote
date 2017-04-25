/**
 * Array类型
 */
//Array构造函数
debugger;
var colors = new Array(20);//创建length为20的数组
/**
 *不要这样，会创建一个包含2或3项的数组，在IE8及之前的版本中ECMAScript
 实现数组字面量存在bug，代码会创建包含1,2，undefined的数组
 *  
 */
var options = [1,2,];
//数组的length不是只读的
var colors = ["red","blue","green"];
colors.length;//3
colors[colors.length] = "yellow";//["red","blue","green","yellow"];
colors.length = 2;//["red","blue"]
colors[4] = "green";//["red","blue",,,"green"]

//监测数组，Array.isArray()方法
Array.isArray(colors);//true

/**
 * 5.2.2转换方法，所有对象都有toLocaleString(),toString()和valueOf()方法
 */
var person1 = {
     toLocaleString : function(){
         return "Nikolaos";
     },
     toString : function(){
         return "Nicholas";
     }
 }
var person2 = {
     toLocaleString : function(){
         return "Grigorios";
     },
     toString : function(){
         return "Greg";
     }
 };
var people = [person1, person2];
//alert()方法接收字符串为参数，会隐式调用toString()方法
/*alert(people);//Nicholas,Greg
alert(people.toString());//Nicholas,Greg
alert(people.toLocaleString());//Nikolas,Grigrios
*/
//join方法,只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组的字符串。如果不给join方法传入任何值或undefined，则是用逗号作为分隔符
colors = ["red","blue","green"];
console.log(colors.join(","));//red,green,blue
console.log(colors.join("||"));//red||green||blue

/**
 * 数组操作方法：
 * （1） 栈方法，LIFO后进先出：
 *          push方法接收任意数量的参数，把他们逐个添加到数组末尾，并返回修改后数组的长度
 *          pop方法从数组末尾移除最后一项，减少数组的length值，然后返回移除的项
 * 
 * （2） 队列方法，FIFO先进先出：
 *          shift方法移除数组中的第一个项并返回该项，同时将数组长度减1
 *          unshift方法在数组前端添加任意个数并返回新数组的长度
 * 
 * 5.2.5 重排序方法
 * reverse()和sort()
 */
//sort方法默认按升序排列数组项，对于每个数组项调用toString()方法，比较的是字符串
var values = [0,1,5,10,15];
values.sort();
console.log(values);//0,10,15,5

//5.2.6 操作方法
//concat()方法，将传递给concat()方法的参数添加到当前数组的副本末尾，最后返回新构建的数组
var color2 = ["red", "green", "blue"];
var color3 = color2.concat("yellow", ["black", "brown"]);
console.log(color2);//原数组未变
console.log(color3);//["red", "green", "blue", "yellow", "black", "brown"]

//slice()方法，接收一个或两个参数，即要返回项的起始和结束位置。两个参数时返回起始和结束之间的项但不包含结束位置的项，不会影响到原数组,如果参数中有一个负数，则用数组长度加上该数来确定相应的位置，如果结束位置小于起始位置，则返回空数组
var color4 = ["red", "green", "blue", "yellow", "purple"];
var color5 = color4.slice(1);//["green", "blue", "yellow", "purple"]
var color6 = color4.slice(1,4);//["green", "blue", "yellow"]

/**
 * splice()方法：
 * （1）删除，指定2个参数，要删除的第一项的位置和要删除的项数。
 * （2）插入，提供3个参数，起始位置、0（要删除的个数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。
 * （3）替换，指定3个参数，起始位置，要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等
 * splice方法始终返回一个数组，该数组包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。
 */
var cos = ["red", "green", "blue"];
var removed = cos.splice(0,1);
console.log(cos);//green,blue
console.log(removed);//red

removed = cos.splice(1, 0, "yellow", "organge");
console.log(cos);//green,yellow,orange,blue
console.log(removed);//[]

removed = cos.splice(1, 1, "red", "purple");
console.log(cos);//green,red,purple,orange,blue
console.log(removed);//yellow

/**
 * 5.2.7 位置方法：
 * indexOf()和lastIndexOf()接收两个参数:要查找的项和（可选的）表示查找起点位置的索引，其中indexOf()从前往后查找，lastIndexOf()从后往前,比较匹配项时使用的是全等符号===
 */
var numbers = [1,2,3,4,5,4,3,2,1];
console.log(numbers.indexOf(4));//3
console.log(numbers.lastIndexOf(4));//5

/**
 * 5.2.8 迭代方法
 * every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true。
 *  filter()：对数组中的每一项运行给定函数，返回该函数会返回true 的项组成的数组。
 * forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。
 *  map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
 *  some()：对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。
 */
var everyResult = numbers.every(function(item, index, array){
    return (item > 2);
})
console.log(everyResult);//false

var someResult = numbers.some(function(item, index, array){
    return (item > 2);
})
console.log(someResult);//true

var filterResult = numbers.filter(function(item, index, array){
    return (item > 2);
})
console.log(filterResult);//[3,4,5,4,3]

var mapResult = numbers.map(function(item, index, array){
    return (item > 2);
})
console.log(mapResult);//[false,false,true,true,true,true,true,false,false]

var mapResult2 = numbers.map(function(value, index, array){
    return value * 2;
})
console.log(mapResult2);//[2,4,6,8,10,8,6,4,2]

//forEach()方法没有返回值，本质与使用for循环迭代数组一样。
numbers.forEach(function(value, index, array){
    console.log("value is :" + value + " index is:" + index + " in array:" + array)
});//结果就是循环打印

/**
 * 5.2.9 归并方法，reduce()和reduceRight()方法，两个方法都会迭代数组的所有项，然后构建一个最终返回的值。
 * reduce()从数组的第一项开始，逐个遍历，reduceRight()从数组的最后一项开始遍历。
 * 都接收两个参数：一个在每一项上调用的函数和（可选的额）作为归并基础的初始值，callback函数接收4个参数：前一个值，当前值，项的索引，数组对。
 * 这个函数返回的任何值都会作为第一个参数自动传递给下一项。第一次迭代发生在数组的第二项，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。
 */
console.log(arr)
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array){
    console.log(prev + "&" + cur)
    return prev + cur;
});
console.log(sum);//15