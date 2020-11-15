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
