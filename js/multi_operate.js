/**
 * @chapter 3.5.4
 * @theme 乘性操作符
 * 参与乘性计算的某个操作数不是数值，后台会使用Number()转换为数值
 * 1.乘法操作符遵循规则：
 * (1).如果是Infinity与0相乘，结果为NaN
 * (2).如果是Infinity与非0数值相乘，结果为Infinity或者-infinity，取决于有符号操作数的符号
 * (3).如果是Infinity与Infinity相乘，结果为Infinity
 * (4).如果有一个操作数不是数值，则在后台调用Number()转换成数值。在计算
 * 
 * 2.除法操作符遵循规则：
 * (1).如果只有一个操作符有符号，结果就是负数，商超过ECMAScript数值范围返回Infinity或-Infinity
 * (2).如果是Infinity被Infinity除，则结果为NaN
 * (3).如果是0/0，则结果为NaN
 * (4).如果是非零的有限数被零除，则结果是Infinity或-Infinity，取决于有符号操作符的符号
 * (5).如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有符号操作数的符号
 * 
 * 3.求模
 * (1).如果被除数是无穷大而除数是有限大的数值，则结果为NaN
 * (2).如果被除数是有限大的数值而除数是0，则返回NaN
 * (3).如果被除数是有限大的数值而除数是无穷大的数值，结果是被除数
 * (4).Infinity%Infinity == NaN
 * (5).被除数是0，则结果为0
 */