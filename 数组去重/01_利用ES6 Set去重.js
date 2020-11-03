let arr = [
    1, 1, 'true', 'true', true, true, 15, 15, false, false,
    undefined, undefined, null, null, NaN, NaN, 'NaN',
    0, 0, 'a', 'a', {}, {}
];

// 可以去掉相同的 NaN，不会去掉看起来一样的 对象
let arr2 = Array.from(new Set(arr));

// 不考虑兼容性，这种去重的方法代码最少。这种方法还无法去掉“{}”空对象，后面的高阶方法会添加去掉重复“{}”的方法

console.log(arr2); // [1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {}]

console.log([...new Set(arr)]); // 简写方法