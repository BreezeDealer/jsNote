/**
 * 变量的两种类型值，基本类型值和引用类型值。
 * 基本类型值指的是简单的数据段，而引用类型值那些可能由多个值构成的对象。
 * JavaScript不允许直接访问内存中的位置，操作对象实际操作的是对象的引用。
 * 当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值复制一份放到
为新变量分配的空间中。不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一
个对象。复制操作结束后，两个变量实际上将引用同一个对象。因此，改变其中一个变量，就会影响另
一个变量.
 */
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "tom";
console.log(obj2.name);//tom

/**
 * ECMAScript总所有函数的参数都是按值传递的。
 */
function addTen(num){
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
console.log(count);//20,no change
console.log(result);//30

//使用数值