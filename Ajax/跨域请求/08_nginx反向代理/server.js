let express = require('express')
let app = new express()

app.get('/server', function(request, response) {
    const data = {
        name: 'sheng',
        age: 20,
        message: {
            a: 'aaa',
            b: 'bbb'
        }
    }
    response.setHeader('myname', 'xiaozhuang')
    response.send(JSON.stringify(data))
})

app.listen(3000, function(){
    console.log('当前服务器已经连接，监听端口：3000')
})