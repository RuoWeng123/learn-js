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
7. 冒泡排序- reference bubbleSort.js


8. 选择排序 -reference selectionSort.js

9. 插入排序 -reference intersectionSort.js

10. 归并排序 -reference megerSort.js

11. 快速排序 -reference quickSort.js



其实掌握常见的这几种就够了
12. reduce 语法的使用
    + 将数组转换为对象
    + 展开更大的数据
    + 在一次便利中进行两次计算
    + 将映射和锅炉函数组合
    + 按顺序运行异步函数
    ```
    // 将数组转换为对象,后端给了一份数组数据回来了,但是在使用的时候显然对象的效率要高一些.如果我们需要将数组的id作为key,数组的每一项都是value呢?

    const userList = [
        {
            id:'孙悟空',
            age: 500,
            text:'吃俺老孙一棒'
        },
        {
            id:'唐三藏',
            age:25,
            text:'悟空,为师饿了'
        },
        {
            id:'猪八戒',
            age:300,
            text:'媳妇,高老庄就是我家 '
        },
        {
            id:'沙悟净',
            age:200,
            text:'大师兄,二师兄又要分行李'
        }
    ]

    function keyByUserNameReducer(acc, person){
        return {...acc, [person.id]:person}
    }
    let userObj = userList.reduce(keyByUserNameReducer, {});
    console.log(userObj)

    ```
13. array.form() 将类数组转为真正的数组
    +   例如对于arguments 的转换
    ```
     let args = array.slice.call(arguments)

     let args = [].slice.call(arguments)


     let args = array.from(arguments)

     let args = [...arguments]
    ```

    + set结构转化为真真的数组
    ```
        let arr = [1,2,3,4,5,1,2];
        let set = new Set(arr)
        let new_arr = Array.form(set)
    ```

    + 将字符串转化为数组
    ```
        let str = "hello word"

        console.log(str.split(''))

        console.log(Array.from(str))
    ```

14. splice 和  delete 删除数组中内容的相同点和不同点
```
 let a = [
        {id:"1", age:1},
        {id:"2", age:1},
        {id:"3", age:1},
        {id:"4", age:1},
    ]  

    a.splice(1,1)
    // 此时数组的长度 -1

    delete a[1]

    // 此时数组的长度不变，只是数据的第二项 变为 undefined


```