#### Proxy
proxy 的中文意思是 **代理**，在MDN上的定义就是：Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层 **“拦截”**，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
> 简单来说一般使用proxy来修改对象上的默认属性和方法。



##### 基本语法

```javascript
const p = new Proxy(target, handler)
```
* 参数
    * target
        要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
    * handler
        一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

##### 使用实例
```javascript
var obj = {
    name: 'sheng',
    age: 20
}

obj = new Proxy(obj, {
    get(target, key) {
        if(typeof target[key] === 'string') {
            return target[key].toUpperCase()
        } else {
            return target[key]
        }
        
    },
    set(target, key, value) {
        if(key === 'name') {
            throw new Error(`禁止修改对象属性 name 的属性值`)
        } else {
            console.log(`将对象的 ${key} 属性属性值设置为 ${value}`)
            target[key] = value
        }
    }
})
console.log(obj.name) // SHENG
obj.name = 'xiaozhuang' // Uncaught Error: 禁止修改对象属性 name 的属性值
```



#### Proxy 的无操作转发

```javascript
let a = {}
let b = new Proxy(a, {})
b.name = 'sheng'
console.log(a) // {name: "sheng"}
```