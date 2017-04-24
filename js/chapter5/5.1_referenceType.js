/**
 * Object类型
 */
//new操作符跟Object构造函数
var person = new Object();
person.name = "Nicolas";
person.age = 29;
//对象字面量表示法
var person1 = {
    name : "Nicolas",
    age : 29
};
console.log(person1);

function displayInfo(args){
    var output = "";
    if(typeof args.name == "string") {
        output += "Name: " + args.name + "\n";
    }
    if(typeof args.age == "number"){
        output += "Age: " + args.age + "\n";
    }
    console.log(output);
}
displayInfo({
    name: "NIcolas",
    age: 29
});
displayInfo({
    name: "Greg"
});
//访问对象属性使用的都是点表示法，也可以使用方括号表示法
person.name == person["name"];//true