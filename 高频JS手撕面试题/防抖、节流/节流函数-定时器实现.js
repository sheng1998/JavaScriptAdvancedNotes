/**
 * 实现函数的节流 （目的是频繁触发中缩减频率）
 * @param {*} fun 需要执行的函数
 * @param {*} delay 检测节流的间隔频率，默认为 500ms
 * @param {*} immediate 是否是立即执行，默认不立即执行
 * @return {可被调用执行的函数}
 */
function throttle(fun, delay = 500, immediate = false) {
    let timer = null;
    return function() {
        if(immediate) {
            if(!timer) {
                fun.apply(this, arguments);
                timer = setTimeout(() => {
                    timer = null;
                }, delay);
            }
        } else {
            if(!timer) {
                timer = setTimeout(() => {
                    fun.apply(this, arguments);
                    timer = null;
                }, delay);
            }
        }
    }
}