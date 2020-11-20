// 引入 express
const express = require('express')

// 监听端口
const PORT = 8000

// 创建 express 框架
const app = express()


// 跨域请求测试—— jsonp 跨域请求
app.get('/jsonp-sever', (request, response) => {
    const data = {
        name: 'sheng'
    }
    response.end(`${request.query.callback}(${(JSON.stringify(data))})`)
})

// 监听端口，启动服务
app.listen(PORT, () => {
    console.log(`服务器已经启动，监听端口：${PORT}`)
})
