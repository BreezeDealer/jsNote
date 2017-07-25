<?php
     $i = 0;
     while(true){
         //输出一些数据，然后立即刷新出缓存
         echo "Number is $i";
         flush();
         //等几秒钟
         sleep(30);
         $i++;
     }
?>