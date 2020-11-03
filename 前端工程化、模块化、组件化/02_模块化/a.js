let student = {
    name: 'xiaozhuang',
    age: 22,
    setName: function(name) {
        this.name = name
    },
    setAge: function(age) {
        this.age = age
    }
}

let a = 'sheng'

let b = 123

let c = function() {
    console.log('I am a function')
}

// exports.a = a
module.exports = {
    a,b,c,student
}