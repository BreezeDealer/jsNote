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
        return function(){
            return this.name;
        }
    }
};
console.log(object.getNameFunc()());//The Global