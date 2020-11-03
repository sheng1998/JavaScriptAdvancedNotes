## JavaScript Array 对象

#### Array 对象
Array 对象用于在变量中存储多个值:
```javascript
var cars = ["Saab", "Volvo", "BMW"];
```
第一个数组元素的索引值为 0，第二个索引值为 1，以此类推。




#### 数组属性
##### constructor
​		返回创建数组对象的原型函数。


##### length
​		设置或返回数组元素的个数。


##### prototype
​		允许你向数组对象添加属性或方法。



#### Array 对象方法
##### concat()
* **定义和用法**
    * 使用 concat 复制数组是深拷贝
    * 该方法用于连接两个或多个数组。
    * 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
* **语法**
```javascript
array1.concat(array2,array3,...,arrayX)
```
* **参数说明**
    * 参数可以是值类型，也可以是数组。
    * 如果参数是一个数组，那么其中的所有元素都会被复制。否则，将复制参数本身。
    * 如果类似数组的对象具有 Symbol.isConcatSpreadable 属性，那么它就会被 concat 当作一个数组来处理：此对象中的元素将被添加
* **实例**
```javascript
let a = ["A", "B"];
let b = ["C"];
let c = {
    0: 'D',
    [Symbol.isConcatSpreadable]: true,
    length: 1
}
let d = a.concat(b, c, 'E', Symbol(1)); // ["A", "B", "C", "D", "E", Symbol(1)]
```



##### copyWithin()
* **定义和用法**
    * 该方法用于从数组的指定位置拷贝元素到数组的另一个指定位置中。
    * 该方法不会改变数组的长度，但是会改变原来数组的值。
* **语法**
```javascript
array.copyWithin(target, start, end)
```
* **参数说明**
    * 第一个参数必选，表示：复制到指定目标索引位置。
    * 第二个参数可选，表示：元素复制的起始位置，不选默认为0。
    * 第三个参数可选，表示：停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。
    * 如果没有第三个参数表示将第二个参数指定的下标到数组结束的值都会被复制到该指定的位置
    * 如果复制的长度与复制到的位置的下标之和大于数组长度，则超长部分不会被复制
* **实例**
```javascript
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.copyWithin(3); // ["Banana", "Orange", "Apple", "Banana"]

let fruits2 = ['A', 'B', 'C', 'D', 'D', 'E'];
// 表示将下标0到2之间的值复制到起始位置的下标为3的地方
fruits2.copyWithin(3, 0, 2); // ["A", "B", "C", "A", "B", "E"]
```



##### entries()
* **定义和用法**
    * entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
    * 迭代对象中数组的索引值作为 key， 数组元素作为 value。
* **语法**
```javascript
array.entries()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
let a = ['A', 'B', 'C'];
let b = a.entries();
let c = {
    a: 1,
    b: 2
}

console.log(b.next().value); // [0, "A"]
console.log(b.next().value); // [1, "B"]
console.log(b.next().value); // [2, "C"]

for(let [key, value] of a.entries()) {
    console.log(key + '---' + value);
    // 0---A
    // 1---B
    // 2---C
}
```



##### every()
* **定义和用法**
    * 该方法用于检测数组中所有元素是否都符合指定条件（由函数提供）。
    * 该方法使用指定函数检测数组中的所有元素：
    * 如果函数中检测到一项不满足指定条件的，则整个表达式返回 false,而且不会继续检测接下来的元素。
    * 只有当数组中所有元素都满足条件才会返回 true。
    * **注意：**every() 不会对空数组进行检测。
    * **注意：**every() 不会改变原始数组。
* **语法**
```javascript
array.every(function(item, index, arr) {return condition;})
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数
        * 函数的第一个参数 `item` 表示数组的每一项。
        * 函数的第二个参数 `index` 表示数组的下标。
        * 函数的第三个参数 `arr` 表示整个数组。
* **实例**
```javascript
let ages = [16, 18, 20, 22];

let checkAge = ages.every(age => {
    // return age >= 18; // false
    return age >= 16; // true
});
```




##### fill()
* **定义和用法**
    * 该方法用一个固定值替换数组中的元素。
    * 该方法会改变数组。
* **语法**
```javascript
array.fill(value, start, end)
```
* **参数说明**
    * 第一个参数 `value`，必须，表示填充的值。
    * 第二个参数 `start`，可选，表示开始填充的下标，默认为 `0`。
    * 第三个参数 `end`，可选，表示停止填充的下标，默认为 `array.length`。
* **实例**
```javascript
let names = ['李白', '韩信', '橘右京', '孙悟空'];
names.fill('露娜'); // ["露娜", "露娜", "露娜", "露娜"]

let fruits = ['橘子', '梨子', '苹果', '草莓']
fruits.fill('西瓜', 1, 3); // ["橘子", "西瓜", "西瓜", "草莓"]
```



##### filter()
* **定义和用法**
    * 该方法会创建一个新数组，新数组的元素是通过检查指定数组中符合条件的所有元素。
    * filter() 不会对空数组进行检测。
    * filter() 不会改变原始数组
* **语法**
```javascript
array.filter(function(item, index, arr) return condition;)
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数
        * 函数的第一个参数 `item` 表示数组的每一项。
        * 函数的第二个参数 `index` 表示数组的下标。
        * 函数的第三个参数 `arr` 表示整个数组。
* **实例**
```javascript
let ages = [16, 17, 18, 20, 21, 22];
let checkAge = ages.filter(age => age >= 18); // [18, 20, 21, 22]
```



##### find()
* **定义和用法**
    * 该方法用于查找数组中满足条件的第一个元素的值。
    * find() 为数组的每一个元素都调用一次函数执行:
        * 当查找到第一个满足条件的元素时,返回该元素，并停止执行剩下元素调用的函数。
        * 如果没有满足条件的元素就返回 undefined。
    * find() 不会对空数组进行检测。
    * find() 不会改变原始数组的值。
* **语法**
```javascript
array.find(function(item, index, arr) return condition;)
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数
        * 函数的第一个参数 `item` 表示数组的每一项。
        * 函数的第二个参数 `index` 表示数组的下标。
        * 函数的第三个参数 `arr` 表示整个数组。
* **实例**
```javascript
let ages = [16, 18, 20, 21, 22];
let checkAge = ages.find(age => age > 16); // 18
```



##### findIndex()
* **定义和用法**
    * 该方法用于查找数组中满足条件的第一个元素所在位置。
    * findIndex() 为数组的每一个元素都调用一次函数执行:
        * 当查找到第一个满足条件的元素时，返回该元素所在位置的下标，并停止执行剩下元素调用的函数。
        * 如果没有满足条件的元素就返回 -1。
    * findIndex() 不会对空数组进行检测。
    * findIndex() 不会改变原始数组的值。
* **语法**
```javascript
array.findIndex(function(item, index, arr) return condition;)
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数
        * 函数的第一个参数 `item` 表示数组的每一项。
        * 函数的第二个参数 `index` 表示数组的下标。
        * 函数的第三个参数 `arr` 表示整个数组。
* **实例**
```javascript
let ages = [16, 18, 20, 21, 22];
let checkAge = ages.findIndex(age => age > 16); // 1
```




##### forEach()
* **定义和用法**
    * forEach() 用于遍历数组的每个元素。
    * forEach() 不会对空数组进行遍历。
    * forEach() 不支持 continue 和 break 语句:
        * 可以利用 some() 实现 continue 语句。
        ```javascript
        let arr = [1, 2, 3, 4, 5];
        arr.some(item => {
            if(item === 3) return;
            console.log(item);
            // 1
            // 2
            // 4
            // 5
        });
        ```
        * 可以利用 every() 实现 break 语句。
        ```javascript
        let arr = [1, 2, 3, 4, 5];
        arr.every(item => {
            console.log(item);
            // 1
            // 2
            // 3
            return item !== 3;
        });
        ```
    * forEach() 不能遍历数组原型上的属性和自身属性
    ```javascript
    Array.prototype.first = 'FRIST';
    let fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
    fruits.descript = 'My favorite fruits';
    fruits.forEach(item => {
        console.log(item);
    })
    // Apple
    // Banana
    // Orange
    // Mango
    ```
* **语法**
```javascript
array.forEach(function(item, index, arr) {})
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数
        * 函数的第一个参数 `item` 表示数组的每一项。
        * 函数的第二个参数 `index` 表示数组的下标。
        * 函数的第三个参数 `arr` 表示整个数组。
* **实例**
```javascript
let ages = [16, 18, 20, 22];

let ages2 = [];
ages.forEach(item => {
    ages2.push(item - 2);
});

console.log(ages2); // [14, 16, 18, 20]
```



##### from()
* **注意：**
    * 这个不是数组原型上的方法。
* **定义和用法**
    * 该方法用于将伪数组装换为真数组(将具有length属性的对象或可迭代的对象转化为数组)。
* **语法**
```javascript
Array.from(obj, function)
```
* **参数说明**
    * 第一个参数 obj，必需，表示需要转换的数组对象。
    * 第二个参数 function，可选，表示数组中每个元素调用的函数。
* **实例**
```javascript
let node = document.getElementsByTagName('li'); // HTMLCollection(4) [li, li, li, li]

let nodeArr = Array.from(node); // [li, li, li, li]

let strArr = Array.from('sheng'); // ["s", "h", "e", "n", "g"]

let setArr = Array.from(new Set(['a', 'b'])); // ["a", "b"]
```



##### includes()
* **定义和用法**
    * 该方法用来判断数组中是否包含指定值，如果存在返回 true，不存在则返回 false。
* **语法**
```javascript
array.includes(searchElement, fromIndex)
```
* **参数说明**
    * 第一个参数 searchElement 必需，表示需要查找的元素值。
    * 第二个参数 fromIndex 可选，默认为 0，表示从该索引处开始查找。
        * 如果 fromIndex 的值大于数组长度，则立即返回 false，该数组不会被检索。
        * 如果 fromIndex 为负数，则按升序从 array.length + fromIndex 的索引开始搜索。如果计算出的索引值还是小于 0，则整个数组都会被检索。
* **实例**
```javascript
let names = ['李白', '韩信', '露娜', '赵云'];

let flag = names.includes('李白'); // true
let flag2 = names.includes('武则天'); // false
let flag3 = names.includes('李白', 1); // false
let flag4 = names.includes('韩信', -1); // false
```



##### indexOf()
* **定义和用法**
    * 该方法用于查找指定元素在数组中第一次出现的位置。
    * 该方法从头到尾进行检索，查找到需要的第一个元素就会返回该元素的下标，并停止继续向后查找。
    * 如果没有找到指定元素就返回 -1。
* **语法**
```javascript
array.indexOf(searchElement, start)
```
* **参数说明**
    * 第一个参数 searchElement 必需，表示需要查找的元素。
    * 第二个参数 start 可选，默认值为 0，表示开始检索的下标，合法取值范围为 0 到 array.length - 1。
        * 如果 start 的值大于数组的长度，则不会检索数组，并返回 -1。
        * 如果 start 的值是负数，则索引值为 start + array.length。如果计算结果还是负数，则从 0 开始检索。
* **实例**
```javascript
let fruits = ["Banana", "Orange", "Apple", "Mango"];

let index = fruits.indexOf('Orange'); // 1
let index1 = fruits.indexOf('Orange1'); // -1
let index2 = fruits.indexOf('Orange', -3); // 1
let index3 = fruits.indexOf('Orange', 1); // 1
```



##### isArray()
* **注意：**
    * 这个不是数组原型上的方法。
* **定义和用法**
    * 该方法用于判断一个对象是否为数组。如果是返回 true，否则返回 false。
* **语法**
```javascript
Array.isArray(obj)
```
* **参数说明**
    * 第一个参数 obj 必需，表示需要判断的对象。
* **实例**
```javascript
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let name = '李白';
Array.isArray(fruits); // true
Array.isArray(name); // false
```



##### join()
* **定义和用法**
    * join() 方法用于将数组的所有元素连接成一个字符串。
    * 该方法会先将数组所有元素转换成字符串，再通过连接符连接在一起。
* **语法**
```javascript
array.join(separator)
```
* **参数说明**
    * 该函数只有一个参数，该参数 separator 可选，代表使用指定的分隔符连接数组的每个元素，默认为逗号。
* **实例**
```javascript
let names = ['李白', '韩信', '赵云', '露娜'];

let str = names.join(); // 李白,韩信,赵云,露娜
let str2 = names.join('-'); // 李白-韩信-赵云-露娜

let obj = {  name: 'sheng',age: 22 };
let ages = [18, 20, obj, true];
let str3 = ages.join('-'); // 18-20-[object Object]-true
```



##### keys()
* **定义和用法**
    * keys() 方法用于从数组创建一个包含数组键的可迭代对象。
* **语法**
```javascript
array.keys()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
let fruits = ["Banana", "Orange", "Apple"];
let keys = fruits.keys();
for (const key of keys) {
    console.log(key);
    // 0
    // 1
    // 2
}
```



##### lastIndexOf()
* **定义和用法**
    * 该方法用于查找指定元素在数组中第一次出现的位置。
    * 该方法从尾到头进行检索，查找到需要的第一个元素就会返回该元素的下标，并停止继续向前查找。
    * 如果没有找到指定元素就返回 -1。
* **语法**
```javascript
array.lastIndexOf(searchElement, start)
```
* **参数说明**
    * 第一个参数 searchElement 必需，表示需要查找的元素。
    * 第二个参数 start 可选，默认值为 array.length - 1，表示从该处开始向前检索，合法取值范围为 0 到 array.length - 1。
        * 如果 start 的值大于数组的长度，则默认从 array.length - 1 处开始向前检索。
        * 如果 start 的值是负数，则索引值为 start + array.length。如果计算结果还是负数，则直接返回 -1。
* **实例**
```javascript
let fruits = ["Banana", "Orange", "Apple", "Mango"];

let index = fruits.lastIndexOf('Orange'); // 1
let index1 = fruits.lastIndexOf('Orange', 8); // 1
let index2 = fruits.lastIndexOf('Orange', -3); // 1
let index3 = fruits.lastIndexOf('Banana', 2); // 0
let index4 = fruits.lastIndexOf('Banana', -8); // -1
```



##### map()
* **定义和用法**
    * 该方法返回一个新数组，数组中的元素为原始数组调用函数处理后的返回值。
    * 该方法会按照原来数组元素顺序依次处理元素。
    * map() 不会对空数组进行检测。
    * map() 不会改变原始数组。
* **语法**
```javascript
array.map(function(item, index, arr) {return condition;})
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数：
        * 函数的第一个参数 item 表示数组的每一项。
        * 函数的第二个参数 index 表示数组的下标。
        * 函数的第三个参数 arr 表示整个数组。
* **实例**
```javascript
let ages = [16, 18, 20, 22];

let checkAge = ages.map(age => {
    return age *2 -16;
}); // [16, 20, 24, 28]
```



##### pop()
* **定义和用法**
    * 该方法用于删除数组中的最后一个元素并返回被删除的元素。
    * 该方法会改变原始数组。
* **语法**
```javascript
array.pop()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
let arr = [0, 1, 2, 3, 4];
let item = arr.pop();
console.log(item); // 4
console.log(arr); // [ 0, 1, 2, 3 ]
```



##### push()
* **定义和用法**
    * 该方法用于向数组最后添加一个或者多个元素，并返回最新的数组长度。
    * 该方法会改变原始数组，原始数组的长度会增加。
* **语法**
```javascript
array.push(item1, item2, ..., itemX)
```
* **参数说明**
    * 参数个数要大于等于 1，每个参数表示插入到原数组的末尾的每一个元素。
* **实例**
```javascript
let names = ['李白', '韩信', '赵云'];
names.push('露娜', ['兰陵王']);
// ["李白", "韩信", "赵云", "露娜", ['兰陵王']]
```



##### reduce()
* **定义和用法**
    * 该方法接收一个函数作为累加器，数组中的每一个值从左到右开始缩减，最终计算一个值。
    * 该方法作为一个高阶函数，用于函数的compose。
    * reduce() 不会对空数组执行回调函数。
* **语法**
```javascript
array.reduce(function(total, item, index, arr) {return total + item;})
```
* **参数说明**
    * 参数为一个函数，必需，函数可以传递四个参数：
        * 函数第一个参数 total 必需，初始值或者计算结束后的返回值。
        * 函数第二个参数 item 必需，当前元素。
        * 函数第三个参数 index 可选，当前元素的索引。
        * 函数第四个参数 arr 可选，当前元素所属数组。
        * 第一次执行 reduce() 时:
            total = array[0]
            item = array[1]
            index = 1
            arr = array
            之后 total 的值为上一次计算的结果，index 逐渐递增。
    * 返回值可以是任何形式的数值运算，不一定是 total + item
* **实例**
```javascript
let grades = [10, 20, 30, 40];

let result = grades.reduce((total, grade, index, arr) => {
    console.log(total, grade, index, arr);
    // 10 20 1 [10, 20, 30, 40]
    // 30 30 2 [10, 20, 30, 40]
    // 60 40 3 [10, 20, 30, 40]
    return total + grade;
});

console.log(result); // 100

let arr2 = [10, 2, 1];
let result2 = arr2.reduce((total, num) => {
    return total*2 - num;
    // 返回 (10*2 - 2)*2 -1 的值
})
```



##### reduceRight()
* **定义和用法**
    * 该方法接收一个函数作为累加器，数组中的每一个值从右到左开始缩减，最终计算一个值。
    * 该方法作为一个高阶函数，用于函数的compose。
    * reduceRight() 不会对空数组执行回调函数。
* **语法**
```javascript
array.reduceRight(function(total, item, index, arr) {return total + item;})
```
* **参数说明**
    * 参数为一个函数，必需，函数可以传递四个参数：
        * 函数第一个参数 total 必需，初始值或者计算结束后的返回值。
        * 函数第二个参数 item 必需，当前元素。
        * 函数第三个参数 index 可选，当前元素的索引。
        * 函数第四个参数 arr 可选，当前元素所属数组。
        * 第一次执行 reduceRight() 时:
            total = array[array.length - 1]
            item = array[array.length - 2]
            index = array.length - 1
            arr = array
            之后 total 的值为上一次计算的结果，index 逐渐递减。
    * 返回值可以是任何形式的数值运算，不一定是 total + item
* **实例**
```javascript
let grades = [10, 20, 30, 40];

let result = grades.reduceRight((total, grade, index, arr) => {
    console.log(total, grade, index, arr);
    // 40 30 2 [10, 20, 30, 40]
    // 70 20 1 [10, 20, 30, 40]
    // 90 10 0 [10, 20, 30, 40]
    return total + grade;
});

console.log(result); // 100
```



##### reverse()
* **定义和用法**
    * 该方法用于颠倒数组中元素的顺序。
    * reverse() 会改变原始数组。
* **语法**
```javascript
array.reverse()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
let names = ['露娜', '韩信', '李白'];
names.reverse(); // ["李白", "韩信", "露娜"]
```



##### shift()
* **定义和用法**
    * 该方法用于删除数组中的第一个元素并返回被删除的元素。
    * 该方法会改变原始数组。
* **语法**
```javascript
array.shift()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
let arr = [0, 1, 2, 3, 4];
let item = arr.shift();
console.log(item); // 0
console.log(arr); // [1, 2, 3, 4]
```




##### slice()
* **注意**
    * slice 不会修改原数组，只会返回一个 `浅复制` 了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：
        * 如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
        * 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。如果向两个数组任一中添加了新元素，则另一个不会受到影响。
* **定义和用法**
    * 该方法会返回一个新数组，新组的元素来源于原数组被提取的部分的元素。
    * slice()方法也可提取 `字符串` 的某个部分，并以新的字符串返回被提取的部分。
    * slice() 不会改变原数组。
* **语法**
```javascript
array.slice(start, end)
```
* **参数说明**
    * 第一个参数 start 可选，表示开始提取的下标，默认为 0。
        * 如果 start 是负数，则 start = start + array.length, 如果计算结果还是负数，则 start = 0。
    * 第二个参数 end 可选，表示结束提取的下标， 默认为 array.length。
        * 如果 end 是负数，则 end = end + array.length, 如果计算结果还是负数，则 end = 0, 返回空数组[]。
    * 如果计算之后 end >= start 或者 end 为负数，则返回空数组[]。
* **实例**
```javascript
let names = ['李白', '韩信', '露娜', '赵云', '哪吒'];

let names2 = names.slice(0, 2); // ["李白", "韩信"]

let names3 = names.slice(); // ["李白", "韩信", "露娜", "赵云", "哪吒"]

let names4 = names.slice(-2); // ["赵云", "哪吒"]
// 以上 names4 相当于 names.slice(-2 + 5, 5) =》names.slice(3, 5)

let names5 = names.slice(-2, 5); // ["赵云", "哪吒"]
// 以上 names5 相当于 names.slice(-2 + 5, 5) =》names.slice(3, 5)

let names6 = names.slice(-8, 5); // ["李白", "韩信", "露娜", "赵云", "哪吒"]
// 以上 names6 相当于 names.slice(-8 + 5, 5) =》names.slice(-3, 5) =》names.slice(0, 5)

let names7 = names.slice(3, 2); // []

let names8 = names.slice(-3, -2); // ["露娜"]
// 以上 names8 相当于 names.slice(-3 + 5, -2 + 5) =》names.slice(2, 3)

let names9 = names.slice(-3, -6); // []
// 以上 names6 相当于 names.slice(-3 + 5, -6 + 5) =》names.slice(2, -1)
```



##### some()
* **定义和用法**
    * 该方法用于检测数组中是否存在满足某一条件的元素（函数提供）。
    * 只要找到一个满足条件的元素就会返回 true, 剩余的元素不会继续检测。
    * 如果找不到满足条件的元素就返回 false。
    * 如果提供的函数没有返回值，就默认返回 false。
    * some() 不会对空数组进行检验。
    * some() 不会改变原始数组。
* **语法**
```javascript
array.some(function(item, index, arr) {return condition;})
```
* **参数说明**
    * 参数为一个函数，函数可以传递三个参数：
        * 函数的第一个参数 item 表示数组的每一项。
        * 函数的第二个参数 index 表示数组的下标。
        * 函数的第三个参数 arr 表示整个数组。
* **实例**
```javascript
let ages = [16, 18, 20, 22];

let flag = ages.some(age => {
    console.log(age);
    // 16
    // 18
    return age >= 18;
});

console.log(flag); // true
```



##### sort()
* **定义和用法**
    * 该方法用于对数组进行排序，默认为升序。
    * 无论是字符还是数字都可以排序：
        * 如果是字符则按照 ASCII 来排序。
        * 如果是数字则按照数字大小排序。
        * 如果是数字和字母混合，则将数字转换为字符串，再排序。
* **语法**
```javascript
array.sort(function(a, b) {return a -b;})
```
* **参数说明**
参数是一个比较函数：
    如果函数返回 a - b, 则数组升序排序。
    如果函数返回 b - a, 则数组降序排序。
* **实例**
```javascript
let ages = [16, 12, 15, 10, 20, 18];
ages.sort(); // [10, 12, 15, 16, 18, 20]

let ages2 = [16, 12, 15, 10, 20, 18];
ages2.sort((a, b) => {
    return a - b;
}); // [10, 12, 15, 16, 18, 20]

let ages3 = [16, 12, 15, 10, 20, 18];
ages3.sort((a, b) => {
    return b - a;
}); // [20, 18, 16, 15, 12, 10]

let arr = ['10', '0', '1', 2, '4', 1];
arr.sort(); // ["0", "1", 1, "10", 2, "4"]

let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort(); // ["Apple", "Banana", "Mango", "Orange"]
```



##### splice()
* **定义和用法**
    * 该方法可以用于添加、删除、替换数组中的元素。
    * splice() 会改变原始数组。
* **语法**
```javascript
array.splice(index,howmany,item1,.....,itemX)
```
* **参数说明**
    * 第一个参数 index 必需，规定从何处开始添加或者删除。
        * 如果 index 为负数，则 index = index + array.length, 如果计算结果还是负数，则 index = 0。
    * 第二个参数 howmany 可选，规定应该删除多少个元素，可以取 0(表示不删除元素), 负数无效相当于 0, 默认为 array.length - index 。
    * 第三个到第 n 个参数 可选，表示要添加的元素。
* **实例**
```javascript
let ages = [16, 17, 18, 19, 20];
let arr = ages.splice(1, 2);
console.log(arr); // [17, 18]
console.log(ages); // [16, 19, 20]

let arr2 = [1, 2, 3, 4];
arr2.splice(-10, 1, 5, 6);
// 上面一行相当于：arr2.splice(-10 + 5, 1, 5, 6) =》arr2.splice(-5, 1, 5, 6)
console.log(arr2); // [5, 6, 2, 3, 4]
```



##### toString()
* **定义和用法**
    * toString() 方法可把数组转换为字符串，并返回结果。
    * 注意： 数组中的元素之间用逗号分隔。
* **语法**
```javascript
array.toString()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
let fruits = ["Banana", "Orange", "Apple", "Mango"];
var str = fruits.toString(); // 'Banana,Orange,Apple,Mango'
```



##### unshift()
* **定义和用法**
该方法用于向数组的开头添加一个或者多个元素，并返回新的数组长度。
该方法会改变原始数组。
* **语法**
```javascript
array.unshift(item1,item2, ..., itemX)
```
* **参数说明**
    * 参数个数要大于等于 1，每个参数表示插入到原数组的开头的每一个元素。
* **实例**
```javascript
let names = ['李白', '韩信', '赵云'];
names.push('露娜', '兰陵王');
// ["李白", "韩信", "赵云", "露娜", '兰陵王']
```



##### valueOf()
* **定义和用法**
    * valueOf() 方法返回 Array 对象的原始值。
    * 该原始值由 Array 对象派生的所有对象继承。
    * valueOf() 方法通常由 JavaScript 在后台自动调用，并不显式地出现在代码中。
    * 注意： valueOf() 方法不会改变原数组。
* **语法**
```javascript
array.valueOf()
```
* **参数说明**
    * 没有参数。
* **实例**
```javascript
Array.prototype.myname = 'sheng';
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.age = 22;
fruits.name = 'fruit';
var value = fruits.valueOf();
// ["Banana", "Orange", "Apple", "Mango", age: 22, name: "fruit"]
```
