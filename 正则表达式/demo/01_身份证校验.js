let reg1 = /[1-9]\d{5}[1|2]\d{3}((0\d)|(1[0-2]))(([0-2]\d)|(3[0|1]))\d{3}(\d|x|X)/
let reg2 = /[1-9]\d{7}((0\d)|(1[0-2]))(([0-2]\d)|(3[0|1]))\d{3}/
console.log(reg1.test('44172319981128341x'))
console.log(reg2.test('441723981128341'))