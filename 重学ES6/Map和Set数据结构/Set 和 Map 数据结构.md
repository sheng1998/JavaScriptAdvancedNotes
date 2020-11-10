#### Set 结构
Set 结构类似于数组，但是 Set 结构中不存在相同的元素。
> 1 和 '1' 是不同的元素



##### 创建 Set 结构

我们可以通过 `new Set()` 创建 Set 结构。
```javascript
let set = new Set([1, 3, 5, 1, 3]) // Set(3) {1, 3, 5}
```



##### size 属性

size 返回 Set 结构中成员个数，相当于数组的 length 属性

```javascript
console.log(set.size) //3
```



##### add() 方法

可以通过 add() 向 Set 结构加入成员，如果添加了重复的成员，则 Set 会直接忽视
```javascript
set.add(2) // Set(4) {1, 3, 5, 2}
set.add(3) // Set(4) {1, 3, 5, 2}
```



##### delete() 方法
可以通过 delete() 删除 Set 结构的成员，删除成功返回 true，如果删除不存在的成员就会返回false
```javascript
set.delete(2) // true
set.delete(8) // false
console.log(set) // Set(3) {1, 3, 5}
```



##### has() 方法

has() 可以查找 Set 结构中是否有某个成员，如果有返回 true, 反之则返回 false
```javascript
console.log(set.has(1)) // true
console.log(set.has(8)) // false
```



##### clear() 方法

clear() 可以清空 Set 结构的所有成员

```javascript
set.clear()
console.log(set) // Set(0) {}
```



##### Set.prototype.values() 
```javascript
console.log(set.size) //3
```



##### Set.prototype.keys()

```javascript
console.log(set.size) //3
```



##### Set.prototype.entries()

```javascript
console.log(set.size) //3
```



##### Set.prototype.forEach()

```javascript
set.forEach((item) => {
    console.log(item)
    // 1
    // 3
    // 5
})
```



##### 可以使用 for of 遍历 Set 结构

```javascript
for (const item of set) {
    console.log(item)
    // 1
    // 3
    // 5
}
```



##### 可以使用 Set 进行数组去重

```javascript
console.log([...new Set([1, 3, 5, 1, 3])]) // [1, 3, 5]
```



#### WeakSet 结构

WeakSet 结构和 Set 结构相似，都是不可以存在重复值的结构。不同的是，WeakSet 结构的成员**只能是对象**，不能是其他类型的值，WeakSet 没有 size 属性，因此不可以遍历 WeakSet 结构的成员。WeakSet 中的对象都是**弱引用**，所以 WeakSet 结构没有 clear() 方法，因为他会自动回收不用的对象（如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中）。



##### 创建 WeakSet 结构

```javascript
let jelly = {name: 'jelly', age: 20}
let mary = {name: 'mary', age: 22}

let peopleWeakSet = new WeakSet([jelly, mary])

console.log(peopleWeakSet) // WeakSet {{…}, {…}}
```



##### WeakSet 的成员只能是对象

WeakSet 的成员只能是对象，而不能是其他类型的值。
```javascript
peopleWeakSet.add('sheng') // Uncaught TypeError: Invalid value used in weak set
```



##### add() 方法

和 Set 结构一样，但是不同的是，add 添加成员时最好是先将要添加的成员用变量存起来，否则容易被回收器回收。
```javascript
let sheng = {name: 'sheng', age: 22}
peopleWeakSet.add(sheng)
console.log(peopleWeakSet) // WeakSet {{…}, {…}, {…}}
```



##### delete() 方法

和 Set 结构一样
```javascript
let sheng2 = {name: 'sheng2', age: 22}
peopleWeakSet.add(sheng2)
console.log(peopleWeakSet) // WeakSet {{…}, {…}, {…}, {…}}
peopleWeakSet.delete(sheng2)
console.log(peopleWeakSet) // WeakSet {{…}, {…}, {…}}
```



##### has() 方法

和 Set 结构一样，在 WeakSet 结构里如果直接将对象放到括号里面就会返回 false, 因为每一个对象的地址都是不一样的，所以一般将对象保存的变量名来判断是否存在。
```javascript
console.log(peopleWeakSet.has({name: 'mary', age: 22})) // false
console.log(peopleWeakSet.has(mary)) // true
```



##### WeakSet 没有 clear() 方法

WeakSet 没有 clear() 方法，因为 WeakSet 会自动删除元素
```javascript
// peopleWeakSet.clear() // Uncaught TypeError: peopleWeakSet.clear is not a function
mary = null
setTimeout(() => {
    console.log(peopleWeakSet) // WeakSet {{…}, {…}}
}, 2000);
```



##### WeakSet 没有size属性

```javascript
console.log(peopleWeakSet.size) //undefined
```



##### WeakSet 无法遍历它的成员。

WeakSet 没有size属性，没有办法遍历它的成员。
```javascript
peopleWeakSet.forEach((item) => {console.log(item)}) // Uncaught TypeError: peopleWeakSet.forEach is not a function
for (const key of peopleWeakSet) {} // Uncaught TypeError: peopleWeakSet is not iterable
```



#### Map 结构

Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。在 Map 结构中不存在相同的键名，如果键名相同，最后添加的同名键的值会覆盖前面的值。
> 键 1 和 键 '1' 是不同的键



##### 创建 Map 结构

Map 接收二元数组作为参数，最外层数组的成员是一个个表示键值对的数组。如果键名相同，值会被覆盖。
```javascript
let arr = [['name', 'sheng'], ['age', 20], ['age', 22]]
let map = new Map(arr)
console.log(map) // Map(2) {"name" => "sheng", "age" => 22}
```



##### size 属性

size属性返回 Map 结构的成员总数。
```javascript
console.log(map.size) // 2
```



##### set() 方法

set() 方法向结构中添加键值对，如果添加的键已经存在就会更新它的值。
```javascript
map.set('sex', '男')
map.set('age', '20')
console.log(map) // Map(3) {"name" => "sheng", "age" => 20, "sex" => "男"}
```



##### get() 方法

get 方法可以获取结构中某一个键的值，如果该键不存在就返回 undefined
```javascript
console.log(map.get('name')) // 'sheng'
console.log(map.get('name1')) // undefined
```



##### has() 方法

has 方法查找结构中是否存在某一个键，如果存在返回 true, 否则返回 false
```javascript
console.log(map.has('name')) // true
console.log(map.has('name1')) // false
```



##### delete() 方法

delete 方法可以删除结构中某一个键，删除成功就返回 true, 如果删除的键不存在就会删除失败，返回 false
```javascript
map.delete('sex') // true
console.log(map) // Map(2) {"name" => "sheng", "age" => "20"}
```



##### clear() 方法

clear 方法会清空结构中所有的键
```javascript
map.clear()
console.log(map) // Map(0) {}
```



##### Map.prototype.keys()

返回键名的遍历器。
```javascript
console.log(map.keys()) // MapIterator {"name", "age"}
```



##### Map.prototype.values()

返回键值的遍历器。
```javascript
console.log(map.values()) // MapIterator {"sheng", "20"}
```



##### Map.prototype.entries()

返回所有成员的遍历器。
```javascript
console.log(map.entries()) // MapIterator {"name" => "sheng", "age" => "20"}
```



##### Map.prototype.forEach()

遍历 Map 的所有成员
```javascript
map.forEach((item) => {
    console.log(item)
    // sheng
    // 20
})
```



##### 可以使用 for of 遍历 Map 结构

```javascript
for (const [key, value] of map) {
    console.log(key + '=>' + value)
    // name=>sheng
    // age=>20
}

for (const item of map) {
    console.log(item)
    // ["name", "sheng"]
    // ["age", "20"]
}
```



##### Map 转对象

```javascript
function mapToObject(map) {
    let obj = {}
    for (const [key, value] of map) {
        obj[key] = value
    }
    return obj
}
```



##### 对象转 Map

```javascript
function objectToMap(obj) {
    // return new Map(Object.entries(obj)) // 方法1
    let map = new Map()
    for (let key in obj) {
        map.set(key, obj[key])
    }
    return map
}
```



##### Map 与数组的相互转换

```javascript
// 数组转 Map
let map = new Map([['name', 'sheng'], ['age', 20]])

// Map 转 数组
function mapToArray(map) {
    let arr = []
    for (let item of map) {
        arr.push(item)
    }
    // for (let [key, value] of map) {
    //     arr.push([key, value])
    // }
    return arr
}
```



##### Map 与 JSON 的相互转换

```javascript
let map1 = new Map([['A', 1], ['B', 2], ['C', 3], ['D', 4]])
let map2 = new Map([[true, 1], [{foo: 3}, ['abc']]])
let json= {
    "name": "sheng",
    "age": 20
}

// Map 转为 JSON
// ① Map 的键名都是字符串，这时可以选择转为对象 JSON
function mapToJson1(map) {
    return JSON.stringify(mapToObject(map));
}
console.log(mapToJson1(map1)) // {"A":1,"B":2,"C":3,"D":4}

// ② Map 的键名有非字符串，这时可以选择转为数组 JSON
function mapToJson2(map) {
    return JSON.stringify([...map]);
}
console.log(mapToJson2(map2)) // [[true,1],[{"foo":3},["abc"]]]

// JSON 转 Map
function jsonToMap(json) {
    return objectToMap(json);
}
console.log(jsonToMap(json)) // Map(2) {"name" => "sheng", "age" => 20}

// Map 转为对象
function mapToObject(map) {
    let obj = Object.create(null)
    for (const [key, value] of map) {
        obj[key] = value
    }
    return obj
}
// 对象转 Map
function objectToMap(obj) {
    let map = new Map()
    for (const key in obj) {
        map.set(key, obj[key])
    }
    return map
}
```



#### WeakMap 结构
WeakMap 结构和 Map 结构相似，但是 WeakMap 的键只能是**对象**，WeakMap 结构没有 size 属性，不可以被遍历，只有四个方法可用：`get()`、`set()`、`has()`、`delete()`，如果你保存键的对象没有使用或者为null，该键就会被垃圾回收器回收（类似于 WeakSet 结构）
```javascript
let jelly = {name: 'jelly'}
let miffy = {name: 'miffy'}

let weakMap = new WeakMap([[jelly, 10]]) // 键必须为对象
console.log(weakMap)
console.log(weakMap.size) // undefined (没有 size 属性，不可以遍历)

// WeakMap 没有 clear() 方法
// weakMap.clear() // Uncaught TypeError: weakMap.clear is not a function

// 只有四个 Map 中的方法， get()、set()、has()、delete()
console.log(weakMap.get(jelly)) // 10
weakMap.set(miffy, 20)
console.log(weakMap) // WeakMap {{…} => 10, {…} => 20}
console.log(weakMap.has(jelly)) // true
weakMap.delete(miffy)
console.log(weakMap) // WeakMap {{…} => 10}
```
