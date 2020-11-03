/**
 * 实现函数的节流 （目的是频繁触发中缩减频率）
 * @param {*} fun 需要执行的函数
 * @param {*} delay 检测节流的间隔频率，默认为 500ms
 * @return {可被调用执行的函数}
 */
function throttle(fun, delay = 500) {
    let pre = Date.now();
    return function() {
        let now = Date.now();
        if(now - pre >= delay) {
            fun.apply(this, arguments);
            pre = Date.now();
        }
    }
}