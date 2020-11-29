const _subscribe = (function () {
    class Sub{
        constructor() {
            // 定义事件池，设置为数组形式方便事件的加入和移除
            this.$pond = []
        }

        // 向事件池添加事件
        add(func) {
            if(typeof func !== 'function') {
                throw new Error('参数必须为函数类型！')
            } else {
                let flag = this.$pond.includes(func)
                !flag ? this.$pond.push(func) : null
            }
        }

        // 从事件池中移除事件
        remove(func) {
            if(typeof func !== 'function') {
                throw new Error('参数必须为函数类型！')
            } else {
                for (let i = 0; i < this.$pond.length; i++) {
                    if(this.$pond[i] === func) {
                        this.$pond[i] = null
                        break
                    }
                }
            }
        }

        // 通知事件池的方法按照顺序依次执行
        fire(...arg) {
            for (let i = 0; i < this.$pond.length; i++) {
                if(typeof this.$pond[i] === 'function') {
                    this.$pond[i].call(this, arg)
                } else {
                    this.$pond.splice(i, 1)
                    i--
                }
            }
        }
    }

    return function() {
        return new Sub()
    }
})();