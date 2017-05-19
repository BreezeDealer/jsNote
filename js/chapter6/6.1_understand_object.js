//ECMAScript的对象可以想象成散列表：无非就是一组名值对，其中值可以是数据或函数。ECMAScript中的两种属性：数据属性和访问器属性
var person = {};
/**
 * 数据属性：
 * 1.[[Configurable]]:表示能否通过delete删除属性从而重新定义属性
 * 2.[[Enumerable]]:表示能否通过for-in循环返回属性
 * 3.[[Writable]]:表示能否修改属性的值
 * 4.[[Value]]:包含这个属性的数据值，默认是undefined
 */
//修改默认的特性
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicolas"
});
console.log(person.name);//Nicolas
person.name = "Greg";
console.log(person.name);//Nicolas,name已被设置为只读

// Object.defineProperty(person, "address", {
//     configurable: false
// });
//会报错，一旦把属性定义为不可配置的，就不能把它变回可配置了
Object.defineProperty(person, "address", {
    configurable: true
});

//2.访问器属性，不能直接定义，必须使用Object.defineProperty()来定义
var book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if(newValue > 2004){
            this._year = newValue;
            this.edition += newValue -2004;
        }
    }
});

book.year = 2005;
console.log(book.edition);//2

//6.12 定义多个属性
var notebook = {};
Object.defineProperties(notebook, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if(newValue > 2004){
                this.edition += newValue - 2004;
            }
        }
    }
});
notebook.year = 2008;
console.log(notebook);

//6.1.3 读取属性的特性，使用Object.getOwnPropertyDescriptor()方法，取得给定属性的描述符，接收两个参数：属性所在的对象和要读取其描述符的属性名称，返回值是一个对象
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor);
var descriptor2 = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor2);