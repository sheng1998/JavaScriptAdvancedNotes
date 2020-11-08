function usePromise1() {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello world!');
        }, 1000)
    });
    
    p1.then(data => {
        console.log(data)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('1111')
            }, 1000)
        })
    }).then(data => {
        console.log(data)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('2222')
            }, 1000)
        })
    }).then(data => {
        console.log(data)
    })
}

function usePromise2() {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
            // reject('error')
        }, 1000)
    })

    p.then(data => {
        console.log(data)
        return '1111'
    }).then(data => {
        console.log(data)
        return '2222'
    }).catch(err => {
        console.log(err)
        return '0000'
    }).then(data => {
        console.log(data)
        return '3333'
    }).then(data => {
        console.log(data)
    })
}


function allPromise() {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('111')
        }, 2000)
    })

    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('222')
        }, 800)
    })

    let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('333')
        }, 1000)
    })

    let p4 = function() {
        setTimeout(() => {
            return '444'
        }, 1200)
    }

    let p5 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('555')
        }, 800)
    })

    // Promise.all([p1, p2, p3, p4()]).then(data => {
    //     console.log(data)
    // }, err => {
    //     console.log(err)
    // })

    // Promise.race([p1, p2, p3]).then(data => {
    //     console.log(data)
    // }, err => {
    //     console.log(err)
    // })

    Promise.any([p3, p5]).then(data => {
        console.log(data)
    }, err => {
        console.log(err)
    })
}