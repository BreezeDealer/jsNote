//实现原型链
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了SuperType,SubType的原型等于SuperType的实例
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return  this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue());//true
//此时SubType的constructor指向的是SuperType
console.log(SuperType.prototype.constructor);//SuperType

//2.确定原型和实例的关系
//（1）使用instanceof操作符
console.log(instance instanceof Object);//true
console.log(instance instanceof SuperType);//true
console.log(instance instanceof SubType);//true
//（2）使用isPrototypeof()方法,只要是原型链中出现过得原型，都可以说是该原型链所派生的实例的原型
console.log(Object.prototype.isPrototypeOf(instance));//true
console.log(SuperType.prototype.isPrototypeOf(instance));//true

/**
 * 3.谨慎地定义方法
 * 子类型需要重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法，但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后
 */
//重写超类型中的方法
SubType.prototype.getSuperValue = function(){
    return false;
};
var instance1 = new SubType();
console.log(instance1.getSuperValue());//false

//通过原型链是实现继承，不能使用对象字面量创建原型方法，因为会重写原型链
function SuperNijia(){
    this.name = true;
}
SuperNijia.prototype.getSuperName = function(){
    return this.name;
};
function SubNijia(){
    this.subname = false;
}
SubNijia.prototype = new SuperNijia();
SubNijia.prototype = {
    getSubName: function(){
        return this.subname;
    },
    someOtherMethod: function(){
        return false;
    }
};
var nijia = new SubNijia();
//console.log(nijia.getSuperName());//error

/**
 * 4.原型链的问题
 * 通过原型实现继承时，原型实际上会变成另一个类型的实例，原型的实例属性也就变成了现在的原型属性了。
 */
function SuperMan(){
    this.colors = ["red", "blue", "green"];
}
function SubMan(){

}
SubMan.prototype = new SuperMan();
var man = new SubMan();
man.colors.push("black");
console.log(man.colors);//["red", "blue", "green", "black"]
var man2 = new SubMan();
console.log(man2.colors);//["red", "blue", "green", "black"]

/**
 * 6.3.2 借用构造函数（伪造对象或者经典继承）
 */
function SuperA(){
    this.colors = ["red", "blue", "green"];
}
function SubA(){
    //继承了SuperA
    SuperA.call(this);
}
var instanceA = new SubA();
instanceA.colors.push("black");
console.log(instanceA.colors);//["red", "blue", "green", "black"]
var instanceA2 = new SubA();
console.log(instanceA2.colors);//["red", "blue", "green"]

//1.传递参数
function SuperType2(name){
    this.name = name;
}
function SubType2(){
    SuperType2.call(this, "Nicolas");
    this.age = 12;
}
var instanceType = new SubType2();
console.log(instanceType);//{name: "Nicolas", age: 12}

/**
 * 6.3.3 组合继承(微经典继承)，将原型链和借用构造函数的技术组合在一起，发挥二者之长。
 */
function SuperType3(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType3.prototype.sayName = function(){
    console.log(this.name);
};
function SubType3(name, age){
    //继承属性
    SuperType3.call(this, name);
    this.age = age;
}
//继承方法
SubType3.prototype = new SuperType3();
SubType3.prototype.constructor = SubType3;
SubType3.prototype.sayAge = function(){
    console.log(this.age);
};
var type3 = new SubType3("Tomcat", 29);
type3.colors.push("black");
console.log(type3.colors);

var type4 = new SubType3("Xiaomi", 20);
console.log(type4.colors);//没有收到上面的影响
console.log(type4);//

/**
 * 6.3.4 原型式继承,没有使用严格意义上的构造函数，借助原型可以基于已有的对象创建新对象，
 * 同时不必因此创建自定义类型。在object()函数内部，创建一个临时性的构造函数，
 * 然后将传入的对象作为这个构造函数的额原型，最后返回这个临时类型的新实例。
 * 本质上，object()对传入其中的对象执行了移除浅复制
 */
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
var person = {
    name: "Nicolas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends);//[ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]

//ECMAScript5新增了Object.create()方法规范了原型式继承，该方法接收两个参数，一个用作新对象原型的对象和（可选的）一个作文新对象定义额外属性的对象
var es5person = Object.create(person);
es5person.name = "Linda";
es5person.friends.push("Timblieve");
console.log(person.friends);

var es5person2 = Object.create(person, {
    name: {
        value: "Greg"
    }
});
console.log(es5person2.name);//Greg

/**
 * 6.3.5 寄生式继承
 * 与寄生构造函数和工厂模式类似，创建一个仅用于封装继承过程的函数，
 * 该函数在内部以某种方式增强对象，最后再真正地是他作了所用工作一样返回对象
 */
function createAnother(original){
    var clone = object(original);
    clone.sayHi = function(){
        console.log("Hi");
    };
    return clone;
}
var anewperson = createAnother(person);
anewperson.sayHi();//hi

/**
 * 6.3.6 寄生组合式继承
 */
function SuperAsshole(name){
    this.name = name;
    this.groups = ["Hitman", "KickAss", "ButMan"];
}
SuperAsshole.prototype.sayName = function(){
    console.log(this.name);
};
function SubAsshole(name, age){
    SuperAsshole.call(this, name);
    this.age = age;
}
SubAsshole.prototype = new SuperAsshole();
SubAsshole.prototype.constructor = SubAsshole;
SubAsshole.prototype.sayAge = function(){
    console.log(this.age);
}
//寄生式组合式继承，通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。其思路是：不把为了指定子类型的原型而调用超类型的构造函数。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型
//该函数实现了寄生组合式继承的最简单形式，接受两个参数:子类型构造函数和超类型构造函数。
function inhreitPrototype(subType, superType){
    var prototype = object(superType.prototype);//创建对象
    prototype.constructor = subType;//增强对象
    subType.prototype = prototype;//指定对象
}
function SuperText(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperText.prototype.sayName = function(){
    console.log(this.name);
};
function SubText(name, age){
    SuperText.call(this, name);
    this.age = age;
}
inhreitPrototype(SubText, SuperText);
SubText.prototype.sayAge = function(){
    console.log(this.age);
};
var text1 = new SubText("Dick", 12);
text1.sayAge();
text1.sayName();
//寄生组合式继承是引用类型最理想的继承范式