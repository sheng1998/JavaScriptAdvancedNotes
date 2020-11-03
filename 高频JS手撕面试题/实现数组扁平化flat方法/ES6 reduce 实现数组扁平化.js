function myFlat(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? myFlat(cur) : cur);
    }, []);
}