/**
 * 使用该方法实现数组扁平化数组中不可以含有以下数据：
 * undefined    eg: undefined
 * Function()   eg: function fun() {}
 * Symbol   eg: Symbol(2020)
 * 含有中括号一边或者两边的字符串   eg: '[]'、'['
 * 对象中含有数组   eg: {grade: [90]}
 */
function myFlat(arr) {
    let string = JSON.stringify(arr);
    string = '[' + string.replace(/[\[\]]/g, '') + ']';
    string = string.replace(/[,]{2,}/, ',');
    return JSON.parse(string);
}