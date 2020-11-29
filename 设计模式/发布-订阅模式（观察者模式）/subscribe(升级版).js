class Sub{
    constructor() {
        this.callbacks = {}
    }

    // 向事件池添加事件
    on(name, func) {
        if(typeof func !== 'function') {
            throw new Error('参数必须为函数类型！')
        } else {
            if(this.callbacks[name]) {
                let flag = this.callbacks[name].includes(func)
                flag ? null : this.callbacks[name].push(func)
            } else {
                this.callbacks[name] = []
                this.callbacks[name].push(func)
            }
        }
    }

    // 从事件池中移除事件
    off(name, func) {
        if(typeof func !== 'function') {
            throw new Error('参数必须为函数类型！')
        } else {
            for (let i = 0; i < this.callbacks[name].length; i++) {
                if(this.callbacks[name][i] === func) {
                    this.callbacks[name][i] = null
                    break
                }
            }
        }
    }

    // 通知事件池的方法按照顺序依次执行
    emit(name, ...arg) {
        for (let i = 0; i < this.callbacks[name].length; i++) {
            if(typeof this.callbacks[name][i] === 'function') {
                this.callbacks[name][i].call(this, arg)
            } else {
                this.callbacks[name].splice(i, 1)
                i--
            }
        }
    }
}