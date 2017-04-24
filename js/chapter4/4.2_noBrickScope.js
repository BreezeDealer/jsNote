
/**
 * 4.2.1 延长作用域链
 */
function buildUrl(){
    var qs = "?debug=true";
    with(location){
        var url = href + qs;
    }
    return url;
}

//4.2.2 没有块级作用域，如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境
function add(num1,num2){
    sum = num1 + num2;
    return sum;
}
var result = add(10,20);
console.log(sum);//30

//4.3.4 管理内存
function createPerson(name){
    var localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
var globalPerson = createPerson("Nicolas");
//手工解除globalPerson的引用
globalPerson = null;