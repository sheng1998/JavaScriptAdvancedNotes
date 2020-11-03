let arr = [
    1, 1, 'true', 'true', true, true, 15, 15, false, false,
    undefined, undefined, null, null, NaN, NaN, 'NaN',
    0, 0, 'a', 'a', {}, {}
];

// 不会去重 NaN 和 看起来一样的对象
function unique(arr) {
    if (!Array.isArray(arr)) {
        return console.log('请输入数组！');
    }
    let result = [];
    arr.forEach(item => {
        if (result.indexOf(item) === -1) {
            result.push(item);
        }
    });
    return result;
}

console.log(unique(arr)); // [1, 'true', true, 15, false, undefined, null, NaN, NaN, 'NaN', 0, 'a', {}, {}]
