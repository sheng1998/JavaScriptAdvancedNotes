let arr = [
    1, 1, 'true', 'true', true, true, 15, 15, false, false,
    undefined, undefined, null, null, NaN, NaN, 'NaN',
    0, 0, 'a', 'a', {}, {}
];

// 去掉所有 NaN，不会去掉看起来一样的对象
function unique(arr) {
    if(!Array.isArray(arr)) {
        return console.log('请输入数组！');
    }
    return arr.filter((value, index, array) => {
        return array.indexOf(value) === index;
    })
}

console.log(unique(arr)); // [1, 'true', true, 15, false, undefined, null, 'NaN', 0, 'a', {}, {}]