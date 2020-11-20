// 引入 express
const express = require('express')

// 监听端口
const PORT = 8000

// 创建 express 框架
const app = express()

app.use((request, response, next) => {
    // ************************************************************************************
    /* Access-Control-Allow-Origin */
    // 表示允许所有域跨域请求后台数据
    // response.setHeader('Access-Control-Allow-Origin', '*')

    // 设置允许多个域名可以访问数据
    // const originList = [
    //     'http://127.0.0.1:5500',
    //     'http://127.0.0.1:3000',
    //     'http://127.0.0.1:8080'
    // ]
    // if(originList.includes(request.headers.origin.toLocaleLowerCase())) {
    //     response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
    // }

    // 表示仅允许 http://127.0.0.1:5500 请求数据。
    response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')


    // ************************************************************************************
    /* ACcess-Control-Allow-Credentials */
    // 表示 Cookie 可以包含在请求中，一起发送给服务器。
    // true 是这个头的唯一有效值（区分大小写）。如果不需要credentials，相比将其设为false，请直接忽视这个头(将它删除)。
    response.setHeader('Access-Control-Allow-Credentials', true);


    // ************************************************************************************
    /* Access-Control-Expose-Headers */

    // CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
    // Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
    // 如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。
    response.setHeader('Access-Control-Expose-Headers', 'myname, Date');


    // ************************************************************************************
    /* Access-Control-Allow-Methods */

    // 表示所有的请求方式都允许跨域
    // response.setHeader('Access-Control-Allow-Methods', '*');

    // 表示仅仅 GET、POST、HEAD、PUT、OPTIONS 这几种请求方式允许跨域
    // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT, OPTIONS');

    // 表示仅仅允许 GET、POST、HEAD、PUT 请求跨域(因为GET、POST、HEAD是默认允许跨域的)。
    // response.setHeader('Access-Control-Allow-Methods', 'PUT');


    // ************************************************************************************
    /* Access-Control-Allow-Headers */

    // 允许浏览器携带的请求头，用逗号隔开， * 代表任意请求头。
    response.setHeader('Access-Control-Allow-Headers', 'name, Content-Type');


    // ************************************************************************************
    /* Access-Control-Max-Age */
    response.setHeader('Access-Control-Max-Age', 10)
    next();
})

// 跨域请求测试—— cors 跨域请求
app.all('/cors-sever', (request, response) => {
    const data = {
        name: 'sheng'
    }
    // console.log(request.headers)
    console.log(Date.now())
    response.setHeader('myname', 'xiaozhuang')
    response.send(JSON.stringify(data))
})

// 监听端口，启动服务
app.listen(PORT, () => {
    console.log(`服务器已经启动，监听端口：${PORT}`)
})
