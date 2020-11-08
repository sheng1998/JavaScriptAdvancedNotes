class MyPromise {
    constructor(callback) {
        if (typeof callback !== 'function') {
            throw new Error('MyPromise must accept a function as a parameter')
        }

        // 设置初始化状态为 pedding
        this.state = 'pedding'

        // 定义成功的返回值
        this.successValue = ''
        // 定义成功的回调函数队列
        this.onfulfilledCallback = []

        // 定义失败的返回值
        this.errorValue = ''
        // 定义失败的回调函数队列
        this.onrejectedCallback = []

        try {
            callback(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(data) {
        // 如果状态还是初始状态才会执行下面代码
        if (this.state === 'pedding') {
            // 修改当前状态为 fulfilled
            this.state = 'fulfilled'

            // 设置成功的返回值
            this.successValue = data
        }
    }

    reject(error) {
        // 如果状态还是初始状态才会执行下面代码
        if (this.state === 'pedding') {
            // 修改当前状态为 rejected
            this.state = 'rejected'

            // 设置失败的返回值
            this.errorValue = error
        }
    }

    then(onfulfilled, onrejected) {
        return new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                try {
                    let res = onfulfilled(this.successValue)
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            } else if (this.state === 'rejected') {
                try {
                    let res = onrejected(this.errorValue)
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            }

            if (this.state === 'pedding') {
                this.onfulfilledCallback.push(() => {
                    try {
                        let res = onfulfilled(this.successValue)
                        if (res instanceof MyPromise) {
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
                        if (res instanceof MyPromise) {
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

    catch(err) {
        return this.then(() => {}, err)
    }

    static all(list) {
        return new Promise((resolve, reject) => {
            let values = []
            let num = 0
            for (const [key, value] of list.entries()) {
                if(value instanceof MyPromise) {
                    value.then(data => {
                        setValues(key, data)
                    }, err => {
                        reject(err)
                    })
                } else {
                    setValues(key, value)
                }
            }

            function setValues(key, value) {
                values[key] = value
                if(++num === list.length) {
                    resolve(values)
                }
            }
        })
    }

    static race(list) {
        return new Promise((resolve, reject) => {
            for (const value of list) {
                if(value instanceof MyPromise) {
                    value.then(data => {
                        resolve(data)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(value)
                }
            }
        })
    }

    static any(list) {
        return new Promise((resolve, reject) => {
            let values = []
            let num = 0
            for (const [key, value] of list.entries()) {
                if(value instanceof MyPromise) {
                    value.then(data => {
                        resolve(data)
                    }, err => {
                        setValues(key, err)
                    })
                } else {
                    resolve(value)
                }
            }

            function setValues(key, value) {
                values[key] = value
                if(++num === list.length) {
                    reject('AggregateError: All promises were rejected "err"')
                }
            }
        })
    }
}