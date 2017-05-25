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
 * 构造函数的问题是，每个方法都要在实例上重新创建一遍，解决方法就是在构造函数内部使用全局函数，
 * 但是如果对象需要定义多个方法，就要定义多个全局函数，自定义的引用类型就没有封装性可言了。所以出现了：
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
console.log(Object.getPrototypeOf(student1).constructor);

//可以通过对象实例访问保存在原型中的值，却不能通过对象实例重写原型中的值,实例中创建和原型中同一属性名的属性时会屏蔽掉原型中的属性
student1.name = "Greg";
console.log(student1.name);//Greg
console.log(student2.name);//Tom
//通过delete操作符可以删除实例属性，从而使我们可以访问原型中的属性
delete student1.name;
console.log(student1.name);//Tom

//hasOwnProperty()方法检测一个属性是存在实例中还是存在原型中，该方法从Object继承而来，只在给定属性存在对象实例中才会返回true
console.log(student1.hasOwnProperty("name"));//false,该属性在原型中
student1.name = "Jack";
console.log(student1.hasOwnProperty("name"));//true，该属性在实例中
//Object.getOwnPropertyDescriptor()方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用该方法
console.log(Object.getOwnPropertyDescriptor(Student.prototype, "name"));
console.log(Object.getOwnPropertyDescriptor(student1, "sayName"));//undefined，因为该实例上的ownPropertyDescriptor是继承自原型中的

//2.原型与in操作符：单独使用和在for-in循环中，单独使用，in操作符会在通过对象能够访问给定属性时返回true，无论该属性在实例中还是在原型中
console.log("name" in student1);//true
console.log("name" in student2);//true
//同时使用in和hasOwnProperty()可以判断属性存在位置
function hasProtoProperty(object, name){
    return !object.hasOwnProperty(name) && (name in Object);
}
console.log(hasProtoProperty(student1, "name"))//false;
console.log(hasProtoProperty(student2, "name"))//true;

//要取得对象上所有可枚举的实例属性，使用Object.keys()方法，接收一个多少为参数，返回一个包含所有可枚举属性的字符串数组
var keys = Object.keys(student1);
console.log(keys);
//Object.getOwnPropertyNames()方法得到所有实例属性，无论是否可枚举
var keyss = Object.getOwnPropertyNames(Student.prototype);
console.log(keyss);

//3.更简单的原型语法，用一个包含所有属性和方法的对象字面量重写整个原型对象
function Company(){

}
Company.prototype = {
    name: "Baidu",
    address: "BeiJing",
    industry: "IT",
    sayName: function(){
        console.log(this.name);
    }
}
//这样写，constuctor已经不指向Company了
var company = new Company();
console.log(company instanceof Object);//true
console.log(company instanceof Company);//true
console.log(company.constructor == Company);//false
console.log(company.constructor == Object);//true
//解决方法就是对象里声明constructor，但是会造成constructor的[[Enumerable]]特性被设置为true
Company.prototype = {
    constructor: Company,
    name: "Baidu",
    address: "BeiJing",
    industry: "IT",
    sayName: function(){
        console.log(this.name);
    }
}
//重设构造函数
Object.defineProperty(Company.prototype, "constructor", {
    enumerable: false,
    value: Person
});
var company2 = new Company();
console.log(Object.getOwnPropertyNames(Company.prototype));

//可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但是如果重写原型对象，就会切断构造函数和最初原型之间的联系。实例中的指针仅指向原型，而不是指构造函数。

/**
 * 5.原生对象的原型，原生的引用类型，都是采用这种模式创建的。
 * 通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自定义对象的原型一样修改原生对象的原型。
 */
String.prototype.startWith = function(text){
    return this.indexOf(text) == 0;
};
var msg = "Hello world!";
console.log(msg.startsWith("Hello"));//true
//原型方法的问题在于，如果一个属性存在原型中而非实例中，那么修改实例的该属性会影响到所有同一个原型创建的实例上的该属性。而且不能传递参数。

/**
 * 6.2.4 组合使用构造函数模式和原型模式
 * 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
 */
function Worker(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"]
}
Worker.prototype = {
    constructor: Worker,
    sayName: function(){
        console.log(this.name);
    }
}
var worker1 = new Worker("KyleVon", 23, "Front-end Dev");
var worker2 = new Worker("Jade", 22, "Singer");
worker1.sayName();
worker1.friends.push("Dumass")
console.log(worker1.friends);
console.log(worker2.friends);//和worker1一样
console.log(worker1.friends == worker2.friends);//false

/**
 * 6.2.5 动态原型模式
 * 可以通过检查某个应该存在的方法是否有效，来决定是否初始化原型
 */

/**
 * 6.2.6 寄生构造函数模式：
 * 创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回心创建的对象，表面上看，很想典型的构造函数
 */
function Peoples(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var people1 = new Peoples("XiaoMi", 12, "Saler");
people1.sayName();
//这个模式可以在特殊情况下为对象创建构造函数
//创建一个具有额外方法的特殊数组，由于不能直接修改Array构造函数，则可以用这个模式
function SpecialArray(){
    //创建数组
    var values = new Array();
    //添加值
    values.push.apply(values, arguments);
    //添加方法
    values.toPipedString = function(){
        return this.join("|");
    };
    //返回数组
    return values;
}
var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString());//"red|blue|green"
//寄生构造函数模式：返回的对象和构造函数或者与构造函数的原型属性直之间没有关系，其返回的对象和构造函数外部创建的对象没有什么不同，所以不能用instanceof来确定对象类型

/**
 * 6.2.7 稳妥构造函数模式
 * 稳妥对象，没有公共属性，其方法也不引用this的对象，类似于构造函数
 * 但是不同在于：一是新创建的对象不引用this，二是不使用new操作符调用构造函数
 */
function Person2(name, age, job){
    var o = new Object();
    //添加对象
    o.sayName = function(){
        console.log(name);
    };
    return o;
}
//这种模式创建的对象，除了使用sayName()方法，没有其他方法可以访问name的值