let WebSocket = require('ws');
let wss = new WebSocket.Server({port: 3000}, function() {
    console.log('服务器已经打开，监听端口号：3000')
});
wss.on('connection', function(ws) {
    ws.on('message', function(data) {
        console.log(data);
        ws.send('我是服务端');
    })
})
