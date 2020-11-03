function deepClone(obj) {
    let result = Array.isArray(obj) ? [] : {};
    if(typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(typeof obj[key] === 'object'){
                    result[key] = deepClone(obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        }
    }
    return result;
}

// 采用 JSON 进行的深拷贝，无法拷贝到 undefined、function、symbol[、空白(数组中允许存在连续的,,)] 这类数据，它是有小 bug 的深拷贝。
// 拷贝后 undefined、function、symbol、空白 都会转化为 null
function deepCloneA(obj) {
    let json = JSON.stringify(obj);
    return JSON.parse(json)
}

// let arr0 = [1,, [2, 4], undefined, null, function(){}, Symbol(1)]
// let arr1 = deepCloneA(arr0)
// console.log(arr1) // [ 1, null, [ 2, 4 ], null, null, null, null ]

// let arr = [1, 2, 4, [2, 4, 6]]
// let obj = {
//     name: 'sheng',
//     jihe: [2, 4]
// }

// let arr2 = deepClone(arr)
// console.log(arr2)
// arr[1] = 8
// arr[3][1] = 9
// console.log(arr2)