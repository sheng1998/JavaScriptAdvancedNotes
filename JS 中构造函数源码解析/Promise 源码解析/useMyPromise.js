function useMyPromise1() {
    let p1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello world!');
        }, 1000)
    });
    
    p1.then(data => {
        console.log(data)
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('1111')
            }, 1000)
        })
    }).then(data => {
        console.log(data)
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('2222')
            }, 1000)
        })
    }).then(data => {
        console.log(data)
    })
}

function useMyPromise2() {
    let p = new MyPromise((resolve, reject) => {
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

function useMyPromise() {
    let p2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello myPromise')
        }, 1000)
    })
    
    p2.then(data => {
        setTimeout(() => {
            console.log(data)
            return 'data'
        }, 1000)
    }).then(data => {
        setTimeout(() => {
            console.log(data)
        }, 1000)
    })
}

function allMyPromise() {
    let p1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('111')
        }, 2000)
    })

    let p2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('222')
        }, 800)
    })

    let p3 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject('333')
        }, 1000)
    })

    let p4 = function() {
        setTimeout(() => {
            return '444'
        }, 1200)
    }

    let p5 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject('555')
        }, 800)
    })

    // MyPromise.all([p1, p2, p3, p4()]).then(data => {
    //     console.log(data)
    // }, err => {
    //     console.log(err)
    // })

    // MyPromise.race([p1, p2, p3]).then(data => {
    //     console.log(data)
    // }, err => {
    //     console.log(err)
    // })

    MyPromise.any([p3, p5]).then(data => {
        console.log(data)
    }, err => {
        console.log(err)
    })
}