# DOM0 和 DOM2 的区别

### 语法上的区别

##### DOM0
* 在标签内写 onclick 事件
* 在 JS 中写 `box.onclick = function() {}`
```javascript
box.onclick = function() {} // 添加事件
```

<br>

##### DOM2
原生有两个方法用来添加和移除事件处理程序：addEventListener()和removeEventListener()。
它们都有三个参数：
* 第一个参数是事件名（如click）；
* 第二个参数是事件处理程序函数；
* 第三个参数如果是true则表示在捕获阶段调用，为false表示在冒泡阶段调用。

```javascript
box.addEventListener('click', function() {}) // 添加事件
// box.attachEvent('onclick', function() {}) // 添加事件(IE6~8)
box.removeEventListener('click', function() {}) // 移除事件
```

<br>

### 底层运行机制的区别
* 如果定义了两个 dom0 级事件，dom0 级事件会覆盖
* dom2 不会覆盖，会依次执行（dom2 基于事件池机制完成，每增加一个绑定的方法，都会往事件池中添加一个方法，然后依次按序执行（注意：IE6~8 执行顺序随机））
* dom0 和dom2 可以共存，不互相覆盖，但是 dom0 之间依然会覆盖
* dom2 可以添加一些特殊的事件类型绑定方法，而 dom0 不支持此功能，例如：DOMContentLoaded、transitionend...
* dom2 绑定事件在新版本浏览器中会对相同方法进行去重（IE6~8 不支持），意思就是如果多次重复添加了某个方法，执行记录并执行依次。


