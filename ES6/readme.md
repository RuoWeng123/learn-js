### ES6常用语法归纳

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
3. 数据拼接
    ```
    let {a,b,c} = {[1,2],[3,4],[5,6]}
    [...a,...b,...c]  //[1,2,3,4,5,6] 
    ```
4. 求数组中最大值
    ```
    let a = [22,78,1,23,2]
    Math.max(...a)  // 78
    ```
5. 数据合并
    ```
     let {a , b}  = {[1,2,3], [2,3,4]}
     let c = [... new Set([...a, ...b])]
    ```
 6. 交并差 集合的使用  其实使用ramda的 intersecti
    ```
    let a = new Set([1,2,3])
    let b = new Set([2,3,4])
    // 交集
    R.intersection([...a],[...b])

    let c = new Set([...a].filter(item => b.has(item)))

    // 并集
    R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]

    //并集使用set
    let c = [... new Set([...a, ...b])]     // [1,2,3,4]

    // 差

    let c = new Set([...a].filter(x => !b.has(x)))

    ```
7. 冒泡排序

8. 快速排序

9. 插入排序

10. 归并排序