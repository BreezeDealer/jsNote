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
//以上创建的对象既是Object的实例，同时也是Person的实例
console.log(personNo1 instanceof Object);
console.log(personNo1 instanceof Person);//true
console.log(personNo2 instanceof Object);
console.log(personNo2 instanceof Person);//true

//1.将构造函数当做函数
//构造函数使用
var personFunc = new Person("Chess", 23, "Docter");
personFunc.sayName();//Chess
//普通函数调用
Person("Tike", 12, "Student");
global.sayName();//Tike
//在另一个对象的作用域中调用
var personO = new Object();
Person.call(personO, "Kite", 25, "Nurse");
personO.sayName();//Kite

/**
 * 构造函数的问题是，每个方法都要在实例上重新创建一遍，解决方法就是在构造函数内部使用全局函数，但是如果对象需要定义多个方法，就要定义多个全局函数，自定义的引用类型就没有封装性可言了。所以出现了：
 * 6.2.3 原型模式
 * 每一个创建的函数都有一个prototype属性，这个属性是一个指针，指向一个对象，包含可以通过特定类型的所有实例共享的属性和方法。
 * 不必在构造函数中定义对象实例的信息，而是将这些信息直接添加到原型对象中。
 */
function Student(){

}
Student.prototype.name = "Tom";
Student.prototype.age = 12;
Student.prototype.grade = "High School";
Student.prototype.sayName = function(){
    console.log(this.name);
};

var student1 = new Student();
student1.sayName();//Tom

var student2 = new Student();
student2.sayName();//Tom

console.log(student1.sayName == student2.sayName);//true
console.log(Person.prototype.constructor);

//isPrototypeOf()方法来确定对象直接是否存在实例的[[prototype]]指向构造函数下的原型对象
console.log(Student.prototype.isPrototypeOf(student1));//true
console.log(Student.prototype.isPrototypeOf(student2));//true

//Object.getPrototypeOf()返回[[prototype]]的值
console.log(Object.getPrototypeOf(student1));