**Generator** 函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历 Generator 函数。
```javascript
    function* gen() {
        yield 1;
        yield 2;
        yield 3;
    }

    var g = gen();

    g.next() // { value: 1, done: false }
    g.return('foo') // { value: "foo", done: true }
    g.next() // { value: undefined, done: true }
```
上面代码中，遍历器对象 `g` 调用 `return` 方法后，返回值的 `value` 属性就是 `return` 方法的参数 `foo`。并且，Generator 函数的遍历就终止了，返回值的 `done` 属性为 `true`，以后再调用 `next` 方法，`done` 属性总是返回 `true`。

如果 `return` 方法调用时，不提供参数，则返回值的 `value` 属性为 `undefined`。
```javascript
    function* gen() {
        yield 1;
        yield 2;
        yield 3;
    }

    var g = gen();

    g.next() // { value: 1, done: false }
    g.return() // { value: undefined, done: true }
```
如果 Generator 函数内部有 `try...finally` 代码块，且正在执行 `try` 代码块，那么 `return` 方法会导致立刻进入 `finally` 代码块，执行完以后，整个函数才会结束。
```javascript
    function* numbers() {
        yield 1;
        try {
            yield 2;
            yield 3;
        } finally {
            yield 4;
            yield 5;
        }
        yield 6;
    }
    var g = numbers();
    g.next() // { value: 1, done: false }
    g.next() // { value: 2, done: false }
    g.return(7) // { value: 4, done: false }
    g.next() // { value: 5, done: false }
    g.next() // { value: 7, done: true }
```
上面代码中，调用 `return()` 方法后，就开始执行 `finally` 代码块，不执行 `try` 里面剩下的代码了，然后等到 `finally` 代码块执行完，再返回 `return()` 方法指定的返回值。