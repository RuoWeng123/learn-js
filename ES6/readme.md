###ES6常用语法归纳

1. 对象的浅拷贝
    [参考地址](http://www.cnblogs.com/wangyulue/articles/7684515.html)
    ```
        let newObj = targetObj
        let newObj = Object.assign({},targetObj)
    ```
    如果targetObj对象是一个多层次的嵌套对象, 对newObj的对象修改，将会导致targetObj的修改。
    <br>
2. 对象的深拷贝
    ```
    //一般常用的纯json对象克隆就够用了
    let clone = function(obj){
        return JSON.parse(JSON.stringify(obj))
    }

    //构造函数、日期、正则的深度克隆请查看参考文件
    ```
3. 