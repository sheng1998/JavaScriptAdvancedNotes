/*
    * 1.由大小写字母，数字，"_ - @" 组成；
    * 2.必须要有@，@两边都有内容，且两边的内容头尾均不为: " - _"
    * 3. " - _ ." 不允许连续使用
    * 4. 发现一般域名后缀 “.com”、".cn" 、".shop" ,新域名甚至会出现 “.cloud”、".fashion",至少2位
*/
let reg = /^[0-9a-zA-Z]+([-_.][0-9a-zA-Z]+)*@[0-9a-zA-Z]+([-_.][0-9a-zA-Z]+)*\.[a-z]{2,}$/
const emailList = [
    '101@qq.com',
    'ba.bj@qq.vip.com',
    'L-a.bj@Alert.vip.com',
    '187_.8398@qq.com',
    '64.37_637@163.com',
    '64+37_637@163.com',
    '635747@qq.com',
    'baidu.com',
    '7827482@qq'
]
let boolList = []
emailList.forEach(item => {
    boolList.push(reg.test(item))
});

console.log(boolList)