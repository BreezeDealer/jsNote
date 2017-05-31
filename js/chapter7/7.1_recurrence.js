
//作用域链
function compare(val1, val2){
    if(val1 < val2){
        return -1;
    }else if(val > val2){
        return 1;
    }else{
        return 0;
    }
}
var compareResult = compare(5,10);
console.log(compareResult);//-1

var compare2 = createComparisonFunction("name");
var compareResult2 = compare2({ name: "Nicolas"}, { name: "Greg"});
console.log(compareResult2);//1

//7.1 递归，一个函数通过名字调用自身的情况下构成的。
function factorial(num){
    if(num <=1){
        return 1;
    }else{
        return num * arguments.callee(num -1);
    }
}
var text = factorial;
factorial = null;
console.log(text(1));
console.log(text(2));
console.log(text(3));
console.log(text(4));

/**
 * 7.2 闭包：有权访问另一个函数作用域中的变量的函数。
 * 创建闭包的常见方式，就是在一个函数内部创建另一个函数
 */
function createComparisonFunction(propertyName){
    return function(obj1, obj2){
        var val1 = obj1[propertyName];
        var val2 = obj2[propertyName];

        if(val1 < val2){
            return -1;
        }else if(val1 > val2){
            return 1;
        }else{
            return 0;
        }
    };
}

/**
 * 7.2.1 闭包与变量
 * 闭包只能取得包含函数中任何变量的最后一个值，闭包所保存的是整个变量对象，而不是某个特殊的变量。
 */
function createFunctions(){
    var result = new Array();
    for(var i=0; i < 10; i++){
        result[i] = function(num){
            return num;
        }(i);
    }
    return result;
}
console.log(createFunctions());

/**
 * 7.2.2 关于this对象
 * this对象是在运行时基于函数的执行环境绑定的，匿名函数的执行环境有全局性，因此其this对象通常指向window
 */
global.name = "The Global";
var object = {
    name: "My Object",
    getNameFunc: function(){
        var that = this;//把外部作用域中的this对象保存在一个闭包能访问到的变量里，就可以让闭包访问该对象了
        return function(){
           //return this.name;
            return that.name;
        }
    }
};
console.log(object.getNameFunc()());//The Global

//如果想访问作用域中的arguments对象，必须将该对象的引用保存在另一个闭包能够访问到的变量中
//在几种特殊情况下，this的值可能会意外地改变
global.name2 = "It belongs to global";
var object2 = {
    name2: "It belongs to object2",
    getName: function(){
        return this.name2;
    } 
}
console.log(object2.getName());//It belongs to object2;
console.log((object2.getName)());//It belongs to global;
console.log((object2.getName = object2.getName)());//It belongs to global;

/**
 * 7.2.3 内存泄漏
 * 在ie上存的特殊问题，如果闭包的作用域中保存着一个Html元素，那么就意味着钙元素无法被销毁
 */

/**
 * 7.3 模仿块级作用域
 * JavaScript没有块级作用域，意味着在快语句中定义的变量，实际上是在包含函数中而非语句中创建的
 */
function outputNumbers(count){
    for(var i=0; i < count; i++){
        console.log(i);
    }
    console.log(i);
}
outputNumbers(2);

/**
 * JavaScript不会告诉你是否多次声明了同一个变量，只会对后续的声明时而不见，但是会执行后续声明的初始化。
 * 用块级作用域（私有作用域）的匿名函数
 */
(function(){
    //这里是块级作用域
})();

var count = 2;
outputNumbers(count);

/**
 * 7.4 私有变量
 * JavaScript中没有私有成员的概念，所有对象属性都是公有的。但是有私有变量的概念。
 * 任何在函数中的定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。
 * 私有变量包括函数的参数，局部变量和在函数内部定义的其他函数
 */
function add(num1, num2){
    var sum = num1 + num2;
    return sum;
}
/**
 * 有权访问私有变量和私有函数的公有方法称为特权方法,两种在对象上创建特权方法的方式
 */
//1.在构造函数中定义特权方法
function MyObject(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权方法,能够在构造函数中定义特权方法，是因为特权方法作为闭包有权访问在构造函数中定义的所有变量和函数
    this.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    }
}
//利用私有和特权方法，可以隐藏那些不应该被直接修改的数据
function Person(name){
    this.getName = function(){
        return name;
    };
    this.setName = function(value){
        name = value;
    };
}

var person = new Person("Nicolas");
console.log(person.getName());
person.setName("Joseph");
console.log(person.getName());

//2.静态私有变量，通过在私有变量中定义私有变量或函数，创建特权方法
(function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //构造函数
    //未经声明的变量，总是会创建一个全局变量
    MyObject = function(){
    };
    //公有/特权方法
    MyObject.prototype.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    }
})();
//这个模式与构造函数中定义特权方法的区别在于：私有变量和函数是由实例共享的。由于特权方法是在原型上定义的，因此所有实例都使用了同一个函数。而这个特权方法，作为一个闭包，总是保存着对包含作用域的引用。
(function(){
    var name = "";
    Persons = function(value){
        name = value;
    };
    Persons.prototype.getName = function(){
        return name;
    };
    Persons.prototype.setName = function(value){
        name = value;
    };
})();
var persons1 = new Persons("Timer");
console.log(persons1.getName());//Nicolas
persons1.setName("Greg");
console.log(persons1.getName());//Greg

var persons2 = new Persons("Micheal");
console.log(persons1.getName());//Micheal
console.log(persons2.getName());//Micheal

/**
 * 7.4.2 模块模式
 * 为单例创建私有变量和特权方法，所谓单例，指的是只有一个实例的对象
 */
var singleton = {
    //name : value,
    method : function(){
        //这里是方法代码
    }
};
//模块方式通过单例添加私有变量和特权方法能够使其得到增强
var singleton = function(){
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权/公有方法和属性
    return {
        publicProperty: ture,
        publicMethod: function(){
            privateVariable++;
            return privateFunction();
        }
    };
}

//这个对象字面量定义的是单例的公共接口，在需要对单例进行某些初始化，同时又需要维护其他私有变量时非常有用
var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    //components.push(new BaseComponents());
    //公共
    return {
        getComponentCount: function(){
            return components.length;
        },
        registerComponent: function(component){
            if(typeof component == "object"){
                components.push(component);
            }
        }
    };

}();
//如果需要创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，就使用模块模式。

/**
 * 7.4.3 增强的模块模式
 * 在返回对象之前加入对其增强的代码。该模式适合那些单例必须是某种类型的实例。同时还必须添加某些属性和（或）方法对其加以增强的情况。
 */
function CustomType(){

};
CustomType.prototype = {
    constructor: CustomType,
    name: "Tom",
    age: 12,
    sayName: function(){
        return this.name;
    }
}
var singleton = function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //创建对象
    var object = new CustomType();
    //添加特权/公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };
    //返回这个对象
    return object;
}();
//如果前面模块演示例子中的application对象必须是BaseComponent的实例
var BaseComponent = CustomType;
var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new BaseComponent());
    //创建application的一个局部副本
    var app = new BaseComponent();
    //公共接口
    app.getComponentCount = function(){
        return components.length;
    };
    app.registerComponent = function(component){
        if(typeof component == "object"){
            components.push(component);
        }
    };
    //返回这个副本
    return app;
}();
//这个实例实际上是application对象的局部变量版，此后，为app对象添加了能够访问私有变量的公有方法。