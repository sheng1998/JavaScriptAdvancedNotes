* 1. this 是什么？
    * 任何函数本质上都是通过某个对象来调用的，如果没有直接指定就是 window
    * 任何函数内部都有一个变量 this，它的值是调用函数的当前对象
* 2. 如任何确定 this 的值？
    * fun(): window
    * p.fun(): p
    * new fun(): 新创建的对象
    * p.call(obj): obj
    * p.apply(obj): obj
    * p.bind(obj): obj