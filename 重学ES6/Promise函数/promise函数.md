Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
Promise 函数具有两大特点：
* 对象的状态不受外界影响。Promise 对象代表异步操作，包括三种状态:
    * pedding: 初始状态，不是成功或者失败状态。
    * fulfilled: 意味着操作成功完成。
    * rejected: 意味着操作失败。
* 一旦状态改变，就不会再变，任何时候都得到这个结果。
    * pedding -> fulfilled
    * pedding -> rejected

#### Promise.prototype.then()
该方法接收两个参数，每个参数的值都是函数，第二个参数为可选参数。then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
then 方法可以链式调用。
```javascript
usersPromise.then(
    comments => { // resolved 状态的回调函数
        console.log(comments.data);
        return axios.get(`https://api.github.com/users/${comments.data[0].login}/repos`);
    },
    err => { // reject 状态的回调函数
        console.log('reject', err);
    }
).then(
    value => {
        console.log(value.data);
    }
)
```


#### Promise.prototype.catch()
Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
```javascript
usersPromise
    .then(
        comments => {
            console.log(comments.data);
        }
    )
    .catch(
        err => {
            console.error(err);
        }
    )
```


#### Promise.prototype.finally()
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。


#### Promise.all()
p的状态由p1、p2、p3决定，分成两种情况。
* （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
* （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。而且只要出现一个 reject 就立即返回。
```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 1000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2');
    }, 800);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p3');
    }, 500);
});

Promise.all([p1, p2]).then(value => {
    console.log(value); // ["p1", "p2"]
});

Promise.all([p1, p2, p3]).then(value => {
    console.log(value); // Uncaught (in promise) p3
});
```


#### Promise.race()
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
```javascript
const p = Promise.race([p1, p2, p3]);
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 1000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p2');
    }, 900);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3');
    }, 800);
});

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p4');
    }, 500);
});

Promise.race([p1, p2, p3]).then(value => {
    console.log(value); // p3
});

Promise.race([p1, p2, p3, p4]).then(value => {
    console.log(value); // Uncaught (in promise) p4
});
```

#### Promise.allSettled()
Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。

Promise.allSettled() 方法的状态**都是 fulfilled**，返回值是一个`数组`，该数组的每个成员都是一个对象，对应传入Promise.allSettled()的每一个 Promise 实例。每个对象都有**status**属性，该属性的值只可能是字符串 `fulfilled` 或字符串 `rejected`。
* **fulfilled** 时，对象有 `value` 属性，
* **rejected** 时有 `reason` 属性。
```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 1000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p2');
    }, 900);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p3');
    }, 900);
});

Promise.allSettled([p1, p2]).then(value => {
    console.log(value);
    // [
    //   {status: "fulfilled", value: "p1"},
    //   {status: "rejected", reason: "p2"}
    // ]
});

Promise.allSettled([p2, p3]).then(value => {
    console.log(value);
    // [
    //   {status: "rejected", value: "p2"},
    //   {status: "rejected", reason: "p3"}
    // ]
});
```


#### Promise.any()
Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 1000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p2');
    }, 300);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p3');
    }, 500);
});

Promise.any([p1, p2]).then(value => {
    console.log(value); // p1
});

Promise.any([p2, p3])
    .then(value => {
        console.log(value);
    })
    .catch(err => {
        console.error(err); //AggregateError: All promises were rejected
    });
```




