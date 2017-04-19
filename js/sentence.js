

/**
 * label语句，语法：
 * label:statement
 */
/*start: for(i = 0; i < 10 ; i++) {
    console.log(i)
}*/
//break和continue语句，break语句立即退出循环，强制继续执行循环后面的语句，continue语句立即退出循环，但退出后会从循环的顶部继续执行
var num = 0;
for(var i=1 ;i<10 ;i++){
    if(i % 5 == 0){
        break;
    }
    num++;
}
console.log(num);//4

var num1 = 0;
for(var i=1 ;i<10 ;i++){
    if(i % 5 == 0){
        continue;
    }
    num1++;
}
console.log(num1);//8

//label语句和break、continue语句联合使用，从而返回代码中特定的位置
var num3 = 0;
outermost:
for(var i=0; i<10; i++){
    for(var j=0; j<10; j++){
        if(i ==5 && j == 5){
            break outermost;
        }
        num3++;
    }
}
console.log(num3);//55