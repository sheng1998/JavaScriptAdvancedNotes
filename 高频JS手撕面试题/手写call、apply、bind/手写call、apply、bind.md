### apply、call、bind
##### apply、call、bind 三者区别
* apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
* apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
* apply 、 call 、bind 三者都可以利用后续参数传参；
* bind是**返回对应函数**，便于稍后调用；apply、call则是**立即调用** 。
* call 需要把**参数按顺序传递进去**，而 apply 则是把参数放在**数组**里。

> 某个函数的参数是明确知道数量时用 call ; 而不确定的时候用 apply，然后把参数 push进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个数组来遍历所有的参数。

##### 使用实例
```javascript
let obj = {
    x: 2020,
};
let foo = {
    getX() {
        return this.x;
    }
};
console.log(foo.getX.bind(obj)()); // 2020
console.log(foo.getX.call(obj)); // 2020
console.log(foo.getX.apply(obj)); // 2020
```



##### 手写 call

```javascript
Function.prototype.myCall = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('error');
    }
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);

    let result = context.fn(...args);
    delete context.fn;
    return result;
}
```



##### 手写 apply

```javascript
Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('error');
    }
    context = context || window;
    context.fn = this;
    let result;
    if(arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}
```



##### 手写 bind

```javascript
Function.prototype.myBind = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('error');
    }

    let _this = this;
    let args = [...arguments].slice(1);

    return function F() {
        if(this instanceof F){
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    }
}
```
