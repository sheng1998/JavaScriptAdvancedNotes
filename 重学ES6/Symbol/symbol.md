### Symbol
##### symbol 基本介绍
symbol 是 ES6 引入的第六种基本类型，表示独一无二的值，常用于创建对象的私有属性。



##### symbol 作用
* symbol 可以解决对象属性命名冲突的问题。
```javascript
let obj1 = {
    [Symbol('sheng')]: 'sheng1',
    [Symbol('sheng')]: 'sheng2',
    [Symbol('sheng')]: 'sheng3'
}
console.log(obj1); // {Symbol(sheng): "sheng1", Symbol(sheng): "sheng2", Symbol(sheng): "sheng3"}

let obj2 = {
    sheng: 'sheng1',
    sheng: 'sheng2',
    sheng: 'sheng3'
}
console.log(obj2); // {sheng: "sheng3"}
```




* symbol 可以模拟私有属性。



##### symbol 基本用法
* 调用全局函数 Symbol 创建，该函数接收一个字符串作为描述参数：
```javascript
let sy = Symbol('2020');
console.log(sy); // Symbol(2020)
```
>不能使用 new 调用，因为 Symbol 是基本类型，不是返回对象。




* 不能通过运算强制转换字符串和数字。
```javascript
let sy1 = Symbol(2020);
// let num = sy1 + 1; //  Uncaught TypeError: Cannot convert a Symbol value to a number
// let number = Number(sy1); //  Uncaught TypeError: Cannot convert a Symbol value to a number

let sy2 = Symbol('sheng');
// let str = sy2 + ''; // Uncaught TypeError: Cannot convert a Symbol value to a string
let string = String(sy2);
console.log(string); // Symbol(sheng)
```



* 因为 Symbol 本身表示独一无二的值，所以两个相同描述的 Symbol 是不相等的：
```javascript
let sy1 = Symbol('2020');
let sy2 = Symbol('2020');

console.log(sy1 == sy2); // false
```



* 对象作为描述的会优先调用对象的 toString() 方法
```javascript
let obj1 = {
    name: 'sheng',
    toString: function() {
        return 'obj 的 toString()'
    }
}
let sy1 = Symbol(obj1);
console.log(sy1); // Symbol(obj 的 toString())


let obj2 = {
    name: 'sheng'
}
let sy2 = Symbol(obj2);
console.log(sy2); // Symbol([object Object])
```




##### Symbol相关方法
有时候我们需要用到同一个 Symbol 来做一些处理，就要用到 Symbol.for 方法来注册一个全局的 Symbol
```javascript
let sy1 = Symbol.for(2020);
let sy2 = Symbol.for(2020);
let obj = {
    [sy1]: 'sheng'
}

console.log(obj[sy1]); // sheng
console.log(obj[sy2]); // sheng
console.log(sy1 === sy2); // true
```



##### getOwnPropertySymbols()
使用 Symbol 类型变量命名对象属性，不能使用 for in 进行遍历，ES6 因此提供了一个可以遍历对象属性为 Symbol 类型的方法 getOwnPropertySymbols()
```javascript
let obj = {
    Lili: {grade: 60, gender: 'female'},
    [Symbol('Lily')]: {grade: 60, gender: 'female'},
    [Symbol('nina')]: {grade: 80, gender: 'female'},
    [Symbol('nina')]: {grade: 90, gender: 'female'}
}

for (const key in obj) {
    console.log(key); // Lili
}

const sy = Object.getOwnPropertySymbols(obj);
console.log(sy); // [Symbol(Lily), Symbol(nina), Symbol(nina)]
```
