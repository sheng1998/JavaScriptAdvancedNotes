function debounce(fun, delay = 500) {
    let times = null;
    return function() {
        clearTimeout(times);
        times = setTimeout(() => {
            fun.apply(this, arguments);
        }, delay);
    }
}
