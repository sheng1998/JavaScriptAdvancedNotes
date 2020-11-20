// 引入 express
const express = require('express')

// 监听端口
const PORT = 8001

// 创建 express 框架
const app = express()

app.use(express.static(__dirname))

// 监听端口，启动服务
app.listen(PORT, () => {
    console.log(`服务器已经启动，监听端口：${PORT}`)
})
