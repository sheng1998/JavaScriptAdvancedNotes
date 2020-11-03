let arr = [
    1, 1, 'true', 'true', true, true, 15, 15, false, false,
    undefined, undefined, null, null, NaN, NaN, 'NaN',
    0, 0, 'a', 'a', {}, {}
];

// 不能去除 NaN 和 看起来一样的 对象
function unique(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

console.log(unique(arr)); // [1, 'true', true, 15, false, undefined, null, NaN, NaN, 'NaN', 0, 'a', {}, {}]
