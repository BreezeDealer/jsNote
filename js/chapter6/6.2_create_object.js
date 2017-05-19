//6.2.1工厂模式，抽象了创建具体对象的过程，发明一种函数，用函数封装以特定接口创建对象的细节
//工厂模式解决了创建多个类型对象的问题，却没有解决对象识别的问题（即怎样知道一个对象的类型
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var person1 = createPerson("Nicolas", 29, "SoftWare Engineer");
console.log(person1);
var person2 = createPerson("Greg", 27, "Docter");
console.log(person2);

//6.2.2构造函数模式，js中的构造函数可以创建特定类型的对象，可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法，改写：
/**
 * 与工厂模式不同的是：
 * 1.没有显式地创建对象
 * 2.直接将属性和方法赋给了this对象
 * 3.没有return语句
 */

function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    }
}
var personNo1 = new Person("Tom", 22, "Front-end Developer");
console.log(personNo1);
var personNo2 = new Person("Kyle", 24, "Businessman");
console.log(personNo2);
//personNo1和personNo2分别保存着Person的一个不同的实例，两个对象都有一个constructor(构造函数)属性，该属性指向Person
console.log(personNo1.constructor == Person);//true
console.log(personNo2.constructor == Person);//true