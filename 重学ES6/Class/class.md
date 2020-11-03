### Class
ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

##### ES5 实现构造函数
```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.getName = function() {
    console.log(`My name is ${this.name}`);
}
```


##### class 实现构造函数
```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        console.log(`My name is ${this.name}`);
    }
}
```

其实上面两种方法实现的都是一样的功能。在类中定义的函数不需要 `function` 关键字，而且在函数结束的地方不可以添加逗号，不然就会报错。用 ES5 创建的函数可以直接通过方法名来调用，而通过 class 关键字定义的构造函数必须通过 new 来创建实例。


类的数据类型是 `function` ,类可以完全可以看做是构造函数的另一种写法，因为类本身就是指向构造函数的。
```javascript
class User{}

typeof User // 'function'
User === User.prototype.constructor // true
```



##### 取值函数（getter）和存值函数（setter）

```javascript
class Student{
    set studentNames(value) {
        this.studentName = value;
    }

    get studentNames() {
        return this.studentName;
    }
}

let student = new Student();

student.studentName = 'sheng';
console.log(student.studentName); // sheng
```



##### constructor 方法

`constructor` 是每个类的默认方法，在通过 new 创建实例的时候会自动调用该方法。一个类必须有 `constructor` 方法，如果没有手动定义，那么就会自动生成一个空的 `constructor` 方法。
```javascript
class User{}

// 等同于
class User{
    constructor() {}
}
```



##### 类不存在变量提升

```javascript
new Foo(); // ReferenceError
class Foo {}
```



##### 静态方法
类相当于实例的原型，所有定义在类中的方法都会被实例继承，为了在类中定义的方法不被实例继承，可以在方法名前加上 `static` 关键字，该方法就不会被实例继承了，只能通过类直接来调用，这就是所谓的“静态方法”。（类似于数组的 `Array.from()` 方法）。虽然说静态方法不会被实例继承，但是会被子类继承。
```javascript
class User {
    fun() {
        return '我是可以被继承的方法 fun';
    }

    static myFun() {
        return '我是不可以被继承的方法 myFun';
    }
}

let user = new User();
console.log(user.fun()); // 我是可以被继承的方法 fun
// console.log(user.myFun()); // Uncaught TypeError: user.myFun is not a function

console.log(User.myFun()); // 我是不可以被继承的方法 myFun
```



##### 静态属性

静态属性的定义有两种方法：
```javascript
class Students{}
Students.myName = 'student';

let student = new Students();
console.log(student.myName); // undefined
console.log(Students.myName); // student
```
上面的方法是旧的方法，现在有一个新的提案，即可以在类的内部定义静态属性。老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。
```javascript
class User {
    static myName = 'sheng';
}

let Lili = new User();
console.log(User.name); // User
console.log(Lili.name); // undefined
console.log(User.myName); // sheng
console.log(Lili.myName); // undefined
```



##### 私有属性和私有方法(老方法)

* 命名前加 `_` ，其实这种方法是不可行的，在类外面还是可以直接使用该方法或属性。
```javascript
class User {
    _foo = this._fun();
    _fun() {
        return '这是私有方法 _fun';
    }
}

let user = new User();
console.log(user._foo); // 这是私有方法 _fun
console.log(user._fun()); // 这是私有方法 _fun
```
* 索性将私有方法移出类的外面，这样子就不可以通过类直接方法该方法了，因为在类内部定义的方法和属性都是对外可见的。
```javascript
class User {
    myBar(baz) {
        return bar.call(this, baz);
    }
}
function bar(baz) {
    return '我是函数 bar';
}

let user = new User();
console.log(user.myBar()); // 我是函数 bar
// console.log(user.bar()); // Uncaught TypeError: user.bar is not a function
```
* 还有一种方法就是利用 `Symbol` 值的唯一性，将私有属性或者私有方法命名为一个 `Symbol` 值。但是这种方式也是可以通过 `Reflect.ownKeys()` 获取到的。
```javascript
let myFun = Symbol('myFun');
class User {
    myFun = this[myFun]();
    [myFun]() {
        return '这是私有方法 myFun';
    }
}

let user = new User();
console.log(user.myFun); // 这是私有方法 myFun
console.log(Reflect.ownKeys(User.prototype)); // ["constructor", Symbol(myFun)]
```



##### 私有属性和私有方法(新提案)
在属性或者方法的命名前加上 `#` 这个符号，表示该属性或者方法为私有的，在类的外部不可以使用。在类内部使用的时候也要加上 `#` 这个符号，也就是说 `#name` 和 `name` 这两个是不一样的属性。之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为 JavaScript 是一门动态语言，没有类型声明，使用独立的符号似乎是唯一的比较方便可靠的方法，能够准确地区分一种属性是否为私有属性。另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。
```javascript
class User {
    #attribute = '我是私有属性 #attribute。';
    attribute = '我是普通属性 attribute。';
    test = this.#fun();

    #fun() {
        return '我是私有方法 #fun。';
    }

    fun() {
        return '我是普通方法 fun。';
    }
}

let user = new User();
// console.log(user.#attribute); // Uncaught SyntaxError: Private field '#attribute' must be declared in an enclosing class
console.log(user.attribute); // 我是普通属性 attribute。
// console.log(user.#fun); // Uncaught SyntaxError: Private field '#fun' must be declared in an enclosing class
console.log(user.fun()); // 我是普通方法 fun。
console.log(user.test); // 我是私有方法 #fun。
```



##### new.target 属性

`new` 是从构造函数生成实例对象的命令。ES6 为 `new` 命令引入了一个 `new.target` 属性，该属性一般作用域构造函数内部，如果构造函数不是通过 `new` 命令或者 `Reflect.constructor()` 调用的， `new.target` 就会返回 `undefined` ，否则返回整个构造函数，因此通过该属性可以用来确定构造函数是怎么调用的。
```javascript
function Students(name, age) {
    // if(new.target) { // 如果直接调用构造函数，则 new.target === undefined
    if(new.target === Students) { // 通过 new 来生成实例时，new.target === Students
        this.name = name;
        this.age = age;
    } else {
        throw new Error('必须通过 new 命令生成实例。');
    }
}

let student = new Students('Lili', 18);
// Students('sheng', 22); // Uncaught Error: 必须通过 new 命令生成实例
```
* Class 内部调用new.target，返回当前 Class。
```javascript
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

let obj = new Rectangle(3, 4); // 输出 true
```
* 需要注意的是，子类继承父类时，new.target 会返回子类。
```javascript
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
class Square extends Rectangle {
    constructor(length, width) {
        super(length, width);
    }
}

let obj = new Square(3); // 输出 false
```
* 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
```javascript
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}

class Rectangle extends Shape {
    constructor(length, width) {
        super();
    }
}

// let x = new Shape(); // Uncaught Error: 本类不能实例化
let y = new Rectangle(3, 4);
```




#### class 的继承
class 的继承比 ES5 的继承简单很多， ES5 通过修改原型链的方法实现继承，而 class 只需要通过 `extends` 和 `super`关键字就可以实现继承。
* ES5 实现继承
```javascript
function Animal(name) {
    this.name = name;
}

function Dog(name, age) {
    Animal.call(this, name, age);
    this.name = name;
    this.age = age;
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;
```
* ES6 Class 实现继承
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super(name); // 调用了父类的 construtor(name)
        this.age = age;
    }
}
```
##### super
子类必须在 `constructor` 方法中调用 `super` 方法，否则就会报错。这是因为子类自己的 `this` 对象，必须先通过父类的构造函数完成塑造，得到父类的属性和方法，然后再对其进行加工处理，加上自己的实例方法和属性，如果不调用 `super` 方法就得不到 `this` 对象，同时在调用父类的 `super` 方法之前是不能使用 `this` 关键字的，会报错。作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`Bark bark!`);
    }
}

class Dog extends Animal {
    constructor(name, age) {
        // this.age = age; // 报错
        super(name); // 调用了父类的 construtor(name)
        this.age = age;
    }

    bark() {
        console.log(`I am ${this.name}, Bark bark!`);
    }

    temp() {
        super.bark();
    }
}

var dog = new Dog('lucky', 2);
dog.bark(); // I am lucky, Bark bark!
dog.temp();
```



