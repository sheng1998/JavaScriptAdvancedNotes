function myFlat(arr) {
    let array = [];
    arr.forEach(item => {
        if(Array.isArray(item)) {
            array = array.concat(myFlat(item));
        } else {
            array.push(item);
        }
    });
    return array;
}