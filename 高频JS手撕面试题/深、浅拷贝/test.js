let a = require('./01_浅拷贝.js')

let obj = {
    name: 'sheng',
    age: 20,
    arr: [1,3,5],
    fun: function() {console.log(1)}
}

let obj2 = a.shallClone(obj)
console.log(obj2)
obj2.fun()
obj.age = 22
obj.fun = function() {console.log(2)}
obj.arr[1] = 88
console.log(obj2)
obj2.fun()

let arr = [1,2,[3,4,5]]
let arr2 = a.shallClone(arr)
console.log(arr2)
arr[0] = 8
console.log(arr2)
arr[2][0] = 66
console.log(arr2)

