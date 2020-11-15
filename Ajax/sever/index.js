// 引入 express
const express = require('express')

// 监听端口
const PORT = 8000

// 创建 express 框架
const app = express()

// 创建路由规则
// get 请求
app.all('/sever', (request, response) => {
    // 设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    // 设置响应体
    // response.send('get 请求的返回数据')
    const data = {
        name: 'sheng',
        age: 22
    }

    response.send(JSON.stringify(data))
})
app.get('/ie', (request, response) => {
    // 设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置响应体
    response.send(Date.now().toString())
})
app.all('/delay', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    setTimeout(() => {
        response.send('test')
    }, 3000)
})

// post 请求
app.post('/sever1', (request, response) => {
    // console.log(request)
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.send('post 请求的返回数据')
})
app.post('/sever2', (request, response) => {
    // console.log(request)
    response.setHeader('Access-Control-Allow-Origin', '*')

    const data = {
        name: 'sheng1',
        age: 22
    }

    response.send(JSON.stringify(data))
})

app.all('/jquery-sever', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    const data = {
        name: 'sheng',
        age: 22
    }

    response.send(JSON.stringify(data))
    // setTimeout(() => {
    //     response.send(JSON.stringify(data))
    // }, 4000)
})

app.all('/axios-sever', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    const data = {
        name: 'sheng',
        age: 22
    }

    response.send(JSON.stringify(data))
    // setTimeout(() => {
    //     response.send(JSON.stringify(data))
    // }, 4000)
})

app.all('/fetch-sever', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    const data = {
        name: 'sheng',
        age: 22
    }

    response.send(JSON.stringify(data))
})

// 监听端口，启动服务
app.listen(PORT, () => {
    console.log(`服务器已经启动，监听端口：${PORT}`)
})