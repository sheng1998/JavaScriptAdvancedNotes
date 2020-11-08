// 手写简易版的 Promise 函数
function MyPromise(callback) {
    // 验证参数是否为函数类型的
    if(typeof callback !== 'function') {
        throw new Error('MyPromise must accept a function as a parameter')
    }

    // 初始化 Promise 函数的状态
    this.state = 'pedding'

    // 定义成功的返回值
    this.successValue = ''
    // 定义成功的回调函数队列
    this.onfulfilledCallback = []

    // 定义失败的返回值
    this.errorValue = ''
    // 定义失败的回调函数队列
    this.onrejectedCallback = []

    //成功的回调函数
    let resolve = data => {
        if(this.state === 'pedding') {
            // 修改状态
            this.state = 'fulfilled'
            // 设置成功的返回值
            this.successValue = data;

            // 执行被保存起来的成功回调函数
            this.onfulfilledCallback.forEach(fn => fn())
        }
    }

    // 失败的回调函数
    let reject = err => {
        if(this.state === 'pedding') {
            // 修改状态
            this.state = 'rejected'
            // 设置失败的返回值
            this.errorValue = err;

            // 执行被保存起来的失败回调函数
            this.onrejectedCallback.forEach(fn => fn())
        }
    }

    // 立即执行回调函数
    try {
        callback(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

// 定义 then 方法
MyPromise.prototype.then = function(onfulfilled, onrejected) {
    // then 返回的也是 Promise 函数
    return new MyPromise((resolve, reject) => {
        if((typeof onfulfilled === 'function') && (this.state === 'fulfilled')) { // 当状态为 'fulfilled' 时执行
            try {
                let res = onfulfilled(this.successValue)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        } else if((typeof onrejected === 'function') && (this.state === 'rejected')) { // 当状态为 'rejected' 时执行
            try {
                let res = onrejected(this.errorValue)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        }

        // 当状态还没改变就先把函数存储起来，等状态改变后再调用
        if(this.state === 'pedding') {
            this.onfulfilledCallback.push(() => {
                try {
                    let res = onfulfilled(this.successValue)
                    if(res instanceof MyPromise) {
                        res.then(resolve, reject)
                    } else {
                        resolve(res)
                    }
                } catch (error) {
                    reject(error)
                }
            })
            this.onrejectedCallback.push(() => {
                try {
                    let res = onrejected(this.errorValue)
                    if(res instanceof MyPromise) {
                        res.then(resolve, reject)
                    } else {
                        resolve(res)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }
    })
}

// 定义 catch
MyPromise.prototype.catch = function(callback) {
    return this.then(() => {}, callback)
}

// 定义 all
MyPromise.all = function (list) {
    return new MyPromise((resolve, reject) => {
        let values = []
        let count = 0
        for (let [key, value] of list.entries()) {
            // 如果是 Promise 对象就先调用它的 then 方法，得到该 promise 对象的值，再存储到 values 中去
            if(value instanceof MyPromise) {
                value.then(data => {
                    setValues(key, data)
                }, err => {
                    reject(err)
                })
            } else { // 如果是普通值类型的，就直接存储到 values 中去
                setValues(key, value)
            }
        }

        function setValues(key, value) {
            values[key] = value
            if(++count === list.length) { // 当传入的值等于 values 中的有效值个数数调用成功函数
                resolve(values)
            }
        }
    })
}

// 定义 race
MyPromise.race = function (list) {
    return new MyPromise((resolve, reject) => {
        for (let value of list) {
            // 返回状态更新最快的那个
            if(value instanceof MyPromise) {
                value.then(data => {
                    resolve(data)
                }, err => {
                    reject(err)
                })
            } else { // 如果是普通值类型的，就直接调用成功函数
                resolve(value)
            }
        }
    })
}

// 定义 any
MyPromise.any = function (list) {
    return new MyPromise((resolve, reject) => {
        let values = []
        let count = 0
        for (let [key, value] of list.entries()) {
            if(value instanceof MyPromise) {
                value.then(data => {
                    resolve(data) // 只要有一个的值为成功就调用成功函数
                }, err => {
                    setValues(key, err)
                })
            } else { // 如果是普通值类型的，就直接调用成功函数
                resolve(value)
            }
        }

        function setValues(key, value) {
            values[key] = value
            if(++count === list.length) { // 当传入的值都为 reject 时调用错误函数
                reject('AggregateError: All promises were rejected')
            }
        }
    })
}
