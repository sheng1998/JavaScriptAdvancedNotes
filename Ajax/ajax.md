### 原生AJAX请求



##### 第一步 创建XMLHttpRequest对象（浏览器兼容性）

* 所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 `XMLHttpRequest` 对象。
* 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象。
* 为了应对所有的现代浏览器，包括 IE5 和 IE6，请检查浏览器是否支持 XMLHttpRequest 对象。如果支持，则创建 XMLHttpRequest 对象。如果不支持，则创建 `ActiveXObject` 。
```javascript
var xhr;
if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    // 兼容 IE5、IE6
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```
<br />


##### 第二步 创建请求（设置请求方式、请求地址、同异步）

使用 `XMLHttpRequest.open(method, url, async)` 方法来创建请求，该方法有三个参数：
* 第一个参数 `method` 规定了请求的方式
    * 可以为 `GET`
    * 也可以是 `POST`
* 第二个参数 `url` 指定了请求的路径
* 第三个参数 `async` 选择异步请求 `true(异步)` 还是同步请求 `false(同步)`, 默认为异步请求，XMLHttpRequest 对象如果要用于 AJAX 的话，其 open() 方法的 async 参数必须设置为 true, 因为AJAX 指的是异步 JavaScript 和 XML。

```javascript
xhr.open('GET', url, true);
```

**GET请求 和 POST请求 的区别**
* 1、GET请求比 POST请求简单，响应速度快。
* 2、GET请求一般用于请求获取数据；POST请求一般用于发送数据到后台。
* 3、GET请求也可以传递参数到后台，不过它的参数在浏览器的url中是可见的，隐私性安全性较差，而且参数长度是有限的；POST请求可以将请求参数放在请求体中，不会出现在url中，比GET更加安全，而且参数长度没有限制。
* 4、GET请求刷新浏览器或者回退时都没有影响；POST请求在浏览器刷新或者回退时会重新提交数据。
* 5、GET请求可被缓存；POST请求不可被缓存。
* 6、GET请求保留在浏览器的历史记录中；POST请求不会保留在浏览器的历史记录中。
* 7、GET请求可以被收藏为书签；POSt不可以被收藏为书签。
* 8、GET请求只能进行url编码；POST支持多种编码方式。
* 9、对于参数类型，GET请求只支持ASCII类型的字符，而POST请求没有限制。
* 10、提升到HTTP协议层面来研究，GET和POST两种请求的区别：
    * HTTP底层是TCP/IP,所以GET请求和POST请求的底层也是TCP/IP, 两者在本质上是没有区别的。
    * 一般情况下GET请求会产生一个 `TCP 数据包` ；而POST请求会产生两个 `TCP 数据包` 。
        * 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
        * 而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
    * GET与POST都有自己的语义，不能随便混用。
    * 据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点。
    * 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。
<br />


##### 第三步 发送请求（用send发送请求）

使用 `XMLHttpRequest.sent(string)` 方法来发送请求，当请求方式为 `GET` 时，参数 `string` 无效，只有当请求参数为 `POST` 时，才会使用参数 `string`
```javascript
xhr.send();
```
<br />


##### 第四步 监听AJAX状态改变

当在第二步创建请求时选择了 `async=false`, 就没有必要监听状态改变了，因为当请求为同步时，代码的执行会停止在请求的那一行，直到请求的服务器返回了响应结果，才会继续执行接下来的代码，所以当 `async=false` 时，即同步请求时，可以跳过该步骤，直接执行第五步，处理服务器的响应数据。
```javascript
// 4. 监听AJAX状态改变
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status === 200) {
        // 第五步 处理服务器响应数据
    }
}
```
当 `readyState` 发生改变时就会触发 `onreadystatechange` 事件， `readyState` 属性存有 `XMLHttprequest` 的状态信息，从 0 到 4 发生变化。也就是说 readyState 的取值在 0-4 之间：
* 0：请求未初始化
* 1：服务器已建立连接
* 2：请求已接收
* 3：请求处理中
* 4：请求已完成，且响应就绪

`status` 就是http状态码。
* 200 - 请求成功
* 301 - 资源（网页等）被永久转移到其它URL
* 404 - 请求的资源（网页等）不存在
* 500 - 内部服务器错误
<br />

##### 第五步 处理服务器响应数据

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。
* responseText	获得字符串形式的响应数据。
* responseXML	获得 XML 形式的响应数据。
```javascript
// 5. 处理服务器响应数据
document.getElementById('res').innerText = xhr.responseText;
console.log(xhr.responseText);
```
<br />


##### ajax 带参数的请求

对于 GET 请求可以直接在请求 url 后面添加，而对于 POST 而言可以将参数放在 `XMLHttpRequest.send()` 中一般的参数格式是 `name=sheng&age=20` 。
<br />


##### 设置请求头(setRequestHeader())

使用 `XMLHttpRequest.setRequestHeader(key, value)` 可以设置请求的请求头，key 为请求头名， value 为请求头值。
```javascript
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```
<br />


##### 返回指定响应头的值(getResponseHeader())
<br />


##### 返回所有头部信息的字符串(getAllResponseHeaders())
<br />


##### 取消当前响应(abort())

作用：取消当前响应，关闭连接并且结束任何未决的网络活动。
这个方法把 XMLHttpRequest 对象重置为 readyState 为 0 的状态，并且取消所有未决的网络活动。例如，如果请求用了太长时间，而且响应不再必要的时候，可以调用这个方法。
<br />


##### 设置响应数据类型(setRequestHeader)

使用 `XMLHttpRequest.responseType = value` 可以设置响应数据类型
<br />

### jquery 发送ajax请求



##### get 请求
语法：
```javascript
$.get(URL,data,function(data,status,xhr),dataType)
```
实例：
```javascript
$('.btn').eq(0).click(() => {
    $.get('http://127.0.0.1:8000/jquery-sever', {a:100, b: 200}, (data) => {
        console.log(data)
    }, 'json')
})
```
|  参数   | 描述  |
|  ----  | ----  |
| URL  | 必需。请求URL。 |
| data  | 可选。拼接在url?后的数据，该参数为对象类型。 |
| function(data, status, xhr) | 可选。代表当前请求成功运行的函数。<br />额外的参数：<br />①data - 包含来自请求的结果数据<br />②status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）<br />③xhr - 包含 XMLHttpRequest 对象 |
| dataType | 可选。规定预期服务器响应的数据类型。<br />jQuery 会智能判断，可选的类型有：xml、html、text、script、json、jsonp。 |
<br />

##### post 请求
  语法：
```javascript
$.post(URL,data,function(data,status,xhr),dataType)
```
实例：
```javascript
$('.btn').eq(1).click(() => {
    $.post('http://127.0.0.1:8000/jquery-sever', {a:100, b: 200}, (data) => {
        console.log(data)
    }, 'json')
})
```
|  参数   | 描述  |
|  ----  | ----  |
| URL  | 必需。请求URL。 |
| data  | 可选。发送到服务器的数据。 |
| function(data, status, xhr)  | 可选。代表当前请求成功运行的函数。<br />额外的参数：看get请求。 |
| dataType | 可选。规定预期服务器响应的数据类型。<br />jQuery 会智能判断，可选的类型有：xml、html、text、script、json、jsonp。 |
<br />

##### 通用型ajax请求
语法：
```javascript
$.ajax({name1: value1, name2: value2,...})
```
实例：
```javascript
$('.btn').eq(2).click(() => {
    $.ajax({
        url: 'http://127.0.0.1:8000/jquery-sever',
        data: {a:100, b: 200},
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log(data)
        },
        timeout: 3000,
        error: (err) => {
            console.log(err)
        },
        headers: {
            myHeader: 'my'
        }
    })
})
```
下面的表格中列出了可能的名称/值：（前面的是常用的一些参数和值）
|  名称(name)   | 值/描述(value)  |
|  ----  | ----  |
| url  | 必需。请求url（默认是当前页面）。 |
| type  | 可选。规定请求的类型（GET、POST），默认为 GET 。 |
| data  | 可选。发送给服务器的数据，值为一个对象，如果是GET请求会拼接在请求url后面，POST请求就放在请求体里发送给后台。 |
| dataType | 可选。预期服务器响应的数据类型。 |
| headers | 可选。自定义请求头。 |
| success(res, status, xhr) | 当请求成功时要运行的函数。 |
| error(xhr, status, error) | 当请求失败时要运行的函数。 |
| timeout | 可选。设置本地的请求超时时间（单位：ms）。 |
| async | 可选。表示请求是否为异步请求，默认为 true 。 |
| beforeSend | 可选。发送请求前运行的函数。 |
| cache | 布尔值，表示浏览器是否缓存被请求页面。默认是 true。 |
| complete(xhr,status) | 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。 |
| contentType | 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"。 |
| context | 为所有 AJAX 相关的回调函数规定 "this" 值。 |
| dataFilter(data,type) | 用于处理 XMLHttpRequest 原始响应数据的函数。 |
| global | 尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。 |
| ifModified | 布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。 |
| jsonp | 在一个 jsonp 中重写回调函数的字符串。 |
| jsonpCallback | 在一个 jsonp 中规定回调函数的名称。 |
| password | 规定在 HTTP 访问认证请求中使用的密码。 |
| processData | 布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。 |
| scriptCharset | 规定请求的字符集。 |
| traditional | 布尔值，规定是否使用参数序列化的传统样式。 |
| username | 规定在 HTTP 访问认证请求中使用的用户名。 |
| xhr | 用于创建 XMLHttpRequest 对象的函数。 |
<br />


### axios 发送ajax请求

##### get 请求
语法：
```javascript
axios.get(url[, config])
```
用法：
```javascript
axios.get('/axios-sever', {
    // url 参数
    params: { id: 100 },
    // 请求头信息
    headers: { name: 'sheng' },
    timeout: 3000,
    responseType: 'json',
    // 在向服务器发送前，修改请求数据
    transformRequest: [function (data, headers) {
        // 对 data 进行任意转换处理
        return data;
    }],
    // 在传递给 then/catch 前，修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }]
}).then(response => {
    console.log(response)
}).catch(err => {
    console.log(err)
})
```
get 方法中的第一个参数 url 代表请求的路径。
第二个参数 config 是可选参数，该参数是一个对象，常用可选对象名如下表所示：
|  对象名   | 对象值类型  | 描述 |
|  ----  | ----  | ----  |
| params  | 对象 | 可选。会拼接在url?后面一起发送的数据。 |
| headers | 对象 | 可选。自定义请求头。 |
| timeout | 数值 | 可选。设置请求超时时间（单位为ms）。 |
| responseType | 字符串 | 可选。表示服务器响应的数据类型，可选'json'、'document'、'arraybuffer'、'blob'，默认为 'json'。 |
| transformRequest | 数组 | 可选。在向服务器发送前，修改请求数据。用法：看上面的用法。 |
| transformResponse | 数组 | 可选。在传递给 then/catch 前，修改响应数据。用法：看上面的用法。 |
<br />


##### post 请求

语法：
```javascript
axios.post(url[, data[, config]])
```
用法：
```javascript
axios.post('/axios-sever', {
        username: 'sheng',
        password: '123456'
    }, {
    // url 参数
    params: { id: 100 },
    // 请求头信息
    headers: { name: 'sheng' },
    timeout: 3000,
    responseType: 'json',
    // 在向服务器发送前，修改请求数据
    transformRequest: [function (data, headers) {
        // 对 data 进行任意转换处理
        return data;
    }],
    // 在传递给 then/catch 前，修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }]
}).then(response => {
    console.log(response)
}).catch(err => {
    console.log(err)
})
```
post 方法中的第一个参数 url 代表请求的路径。
第二个参数 data 是可选参数，该参数是一个对象，该对象作为请求体一起发送给服务器。
第三个参数 config 是可选参数，该参数是一个对象，常用可选对象名如上表所示（get 请求中的表）。
<br />


##### 通用型ajax请求

语法：
```javascript
axios(config)
```
配置项可选参数如下表：
| 对象名 | 对象值类型 | 描述 |
| ---- | ---- | ---- |
| url | 字符串 | 用于请求的服务器 URL |
| method | 字符串 | 创建请求时使用的方法，默认为 get |
| data | 对象 | 作为请求主体被发送的数据，只适用于 'PUT', 'POST', 和 'PATCH'这些请求方法 |
其余其他方法和get请求中的表格一样。
<br />

##### 全局的 axios 默认值
`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
```javascript
axios.defaults.baseURL = 'http://127.0.0.1:8000';
```

<br />

### fetch 发送 ajax 请求

语法：
```javascript
fetch(url[, config])
```
url 为请求路径，config是请求配置信息，包括：
body: 请求体
method: 请求方法(get、post...)
headers: 请求头(对象)
* 1、fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500
* 2、在默认情况下 fetch不会接受或者发送cookies
实例：
```javascript
fetch('http://127.0.0.1:8000/fetch-sever', {
    method: 'POST',
    headers: {
        name: 'sheng'
    },
    body: 'name=sheng&age=22'
}).then(data => {
    console.log(data)
    return data.json()
}).then(data => {
    console.log(data)
})
```
可见 fetch 返回的是 promise 对象，需要调用两次 then 方法才可以得到返回的数据。
<br />


### 封装属于自己的 AJAX 请求函数
```javascript
/**
 * 封装自己的 AJAX 函数
 * @param {*} option 参数对象，该参数可用的值如下：
 *      @param {*} url 必需。请求url
 *      @param {*} type 可选。请求方式，默认为 get 请求
 *      @param {*} async 可选。是否异步请求，默认为 true(异步请求)
 *      @param {*} dataType 可选。预期服务器响应的数据类型
 *      @param {*} timeout 可选。本地的请求超时时间
 *      @param {*} data 可选。发送给服务器的数据，值为一个对象，如果是GET请求会拼接在请求url后面，POST请求就放在请求体里发送给后台
 *      @param {*} headers 可选。请求头
 *      @param {*} beforeSend 可选。发送请求前运行的函数
 *      @param {*} success 可选。当请求成功时要运行的函数
 *      @param {*} error 可选。当请求失败时要运行的函数
 */
function ajax(option) {
    // 设置默认请求方式 get
    option.type = option.type || 'GET';

    // 检测 url 是否为空
    if(!option.url) {
        throw new Error('URL 不能为空！');
    }

    // 设置默认为异步请求
    if(option.async === 'false' || option.async === false) {
        option.async = false;
    } else {
        option.async = true;
    }

    // 对 option.data 进行加工处理，如果是对象就会转换成字符串。
    if(option.data && Object.prototype.toString.call(option.data) === '[object Object]') {
        option.data = objToString(option.data);
    }

    // 如果 option.data 存在，且方法为 'GET', 就将数据加到 url 的参数上去。
    if(option.data && option.type.toUpperCase() === 'GET') {
        // 如果 url 后面已经附带参数就不用加 '?', 直接加上一个连接符 '&'
        if(option.url.split('?')[1]) {
            option.url += '&' + option.data;
        } else {
            option.url += '?' + option.data;
        }
    }

    // 提前执行发送请求前应该执行的函数
    option.beforeSend();

    // 1、创建XMLHttpRequest对象
    let xhr;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 设置超时请求以及超时错误函数
    if(option.timeout && option.timeout > 0) {
        xhr.timeout = option.timeout;
        xhr.ontimeout = function() {
            option.error('请求超时，请重试！')
        }
    }

    // 2、创建请求（设置请求方式、请求地址、同异步）
    xhr.open(option.type, option.url, option.async);

    // 设置请求头
    for (const key in option.headers) {
        if (option.headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, option.headers[key]);
        }
    }
    
    // 设置预期服务器响应的数据类型。
    if(option.dataType) {
        xhr.responseType = option.dataType;
    }

    // 3、发送请求（用send发送请求）
    if(option.data && option.type.toUpperCase() === 'POST') {
        xhr.send(option.data);
    } else {
        xhr.send();
    }

    if(option.async) {
        // 4、监听AJAX状态改变
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    // 5、处理服务器响应数据
                    option.success && typeof option.success === 'function' && option.success(xhr.response)
                } else {
                    option.error && typeof option.error === 'function' && option.error()
                }
            }
        }
    } else {
        if(xhr.status === 200) {
            // 5、处理服务器响应数据
            option.success && typeof option.success === 'function' && option.success(xhr.response)
        } else {
            option.error && typeof option.error === 'function' && option.error()
        }
    }
    
    
}

// 当参数 data 为对象时，将它转换为字符串
function objToString(obj) {
    if(Object.prototype.toString.call(obj) === '[object Object]') {
        let arr = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(`${key}=${obj[key]}`);
            }
        }
        return arr.join('&');
    }
}
```


