function shallClone(obj) {
    if(typeof obj === 'object' && obj != null) {
        let result = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key]
            }
        }
        return result;
    } else {
        return result;
    }
}

module.exports = {
    shallClone
}

// let obj = {
//     name: 'sheng',
//     age: 20,
//     arr: [1,3,5],
//     fun: function() {console.log(1)}
// }

// let obj2 = shallClone(obj)
// console.log(obj2)
// obj2.fun()

// obj.age = 22
// obj.fun = function() {console.log(2)}
// obj.arr[1] = 88
// console.log(obj2)
// obj2.fun()

// let arr = [1,2,[3,4,5]]
// let arr2 = shallClone(arr)
// console.log(arr2)
// arr[0] = 8
// console.log(arr2)
// arr[2][0] = 66
// console.log(arr2)