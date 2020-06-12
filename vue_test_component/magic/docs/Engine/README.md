---
pageClass: engine-page
sidebar: auto
---

# Engine 

## 下载

```
npm i hasura-data-engine
or
yarn add hasura-data-engine
```

### web
```
import { Engine } from 'hasura-data-engine/dist/Engine.web'
const engine = new Engine({ endpoint: 'localhost:9999/v1alpha1/graphql', useWebsocket: true })
```

### nodejs
```
const { Engine } = require('hasura-data-engine/dist/Engine.node')
const engine = new Engine({ endpoint: 'localhost:9999/v1alpha1/graphql', useWebsocket: true })
```

## 示例数据

> 我们假设存在以下数据模型， 并且已通过`hasura`后台管理界面配置好默认的关联关系：

### class(班级表)

| 字段 | 类型 |  说明 | 备注 | 
| --- | --- | --- | --- |
| id | int |  数据id(非自增) | PK |
| name | text | 班级名称 |  |
| teacher_id | int | 班主任 | 外键，指向`teacher`表

### student(学生表)

| 字段 | 类型 |  说明 | 备注 | 
| --- | --- | --- | --- |
| id | int |  数据id(非自增) | PK |
| name | text | 学生名称 |  |  
| number | int | 学号(自增序号) |  |  
| class_id | int | 所属班级 | 外键，指向`class`表，允许为空 |  

### teacher(老师表)

| 字段 | 类型 |  说明 | 备注 | 
| --- | --- | --- | --- |
| id | int |  数据id(非自增) | PK |
| name | text | 老师名称 |  |  
| number | int | 工号(自增序号) |  |  

### class_teacher_map(班级-老师-映射表)

| 字段 | 类型 |  说明 | 备注 | 
| --- | --- | --- | --- |
| id | int |  数据id(非自增) | PK |
| teacher_id | text | 老师名称 | 外键，指向`teacher`表 |  
| class_id | int | 工号(自增序号) | 外键，指向`class`表 |  

## 初始化db文件

首先在src/common/下面新建db.js，并输入以下代码片段。

> db.js 用于汇总项目中所有用到的表，以及它们之间的关联关系

```js
import { Engine } from 'engine'

const engine = new Engine({ endpoint: 'localhost:9999/v1alpha1/graphql', useWebsocket: true })

const Class = engine.define('class', ['id', 'name', 'teacher_id'])
const Teacher = engine.define('teacher', ['id', 'name', 'number'])
const Student = engine.define('student', ['id', 'name', 'number', 'class_id'])
const ClassTearchMap = engine.define('class_teacher_map', ['id', 'teacher_id', 'class_id'])

Class.relation('teacher', Teacher)
Class.relation('students', Student)
Class.relation('class_teacher_maps', ClassTearchMap)
ClassTearchMap.relation('teacher', Teacher)
ClassTearchMap.relation('class', Class)
Teacher.relation('class', Class)
Teacher.relation('class_teacher_maps', ClassTearchMap)
Student.relation('class', Class)

export {
  engine,
  Student,
  Teacher,
  Class,
  ClassTearchMap
}
```

## 初始化数据

首先确保你本地后台表已经建好，之后请粘贴以下代码并执行，将数据初始化到本地`hasura`后台中, 方便我们马上用到查询！

```js

  import { engine, Teacher, Student, Class, ClassTearchMap } from '@/common/db.js'

  const teachers = [
    { name: '魏老师', id: 1 },
    { name: '许老师', id: 2 },
    { name: '王老师', id: 3 },
    { name: '李老师', id: 4 },
    { name: '孙老师', id: 5 },
    { name: '刘老师', id: 6 }
  ]
  const classes = [
    { name: '高81班', id: 1, teacher_id: 1 },
    { name: '高82班', id: 2, teacher_id: 2 },
    { name: '高83班', id: 3, teacher_id: 3 },
    { name: '高84班', id: 4, teacher_id: 4 },
    { name: '高85班', id: 5, teacher_id: 5 }
  ]
  const students = [
    { name: '学生1', id: 1, class_id: 1 },
    { name: '学生2', id: 2, class_id: 1 },
    { name: '学生3', id: 3, class_id: 1 },
    { name: '学生4', id: 4, class_id: 1 },
    { name: '学生5', id: 5, class_id: 1 },
    { name: '学生6', id: 6, class_id: 1 },
    { name: '学生7', id: 7, class_id: 2 },
    { name: '学生8', id: 8, class_id: 2 },
    { name: '学生9', id: 9, class_id: 2 },
    { name: '学生10', id: 10, class_id: 2 },
    { name: '学生11', id: 11, class_id: 2 },
    { name: '学生12', id: 12, class_id: 2 },
    { name: '学生13', id: 13, class_id: 3 },
    { name: '学生14', id: 14, class_id: 3 },
    { name: '学生15', id: 15, class_id: 3 },
    { name: '学生16', id: 16, class_id: 3 },
    { name: '学生17', id: 17, class_id: 3 },
    { name: '学生18', id: 18, class_id: 3 },
    { name: '学生19', id: 19, class_id: 4 },
    { name: '学生20', id: 20, class_id: 4 },
    { name: '学生21', id: 21, class_id: 4 },
    { name: '学生22', id: 22, class_id: 4 },
    { name: '学生23', id: 23, class_id: 4 },
    { name: '学生24', id: 24, class_id: 4 },
    { name: '学生25', id: 25, class_id: 5 },
    { name: '学生26', id: 26, class_id: 5 },
    { name: '学生27', id: 27, class_id: 5 },
    { name: '学生28', id: 28, class_id: 5 },
    { name: '学生29', id: 29, class_id: 5 },
    { name: '学生30', id: 30, class_id: 5 }
  ]
  const classTearchMap = [
    { teacher_id: 1, class_id: 1 },
    { teacher_id: 6, class_id: 1 },
    { teacher_id: 2, class_id: 2 },
    { teacher_id: 3, class_id: 4 },
    { teacher_id: 4, class_id: 4 },
    { teacher_id: 5, class_id: 5 }
  ]
  engine
      .queues(
        Teacher.Mutation.insert(teachers),
        Class.Mutation.insert(classes),
        Student.Mutation.insert(students),
        ClassTearchMap.Mutation.insert(classTearchMap)
      )
      .run()
```

## Queries

### 简单的数据查询

- 比如说获取所有的班级

```js
Class.find()
```
解析为:
```
query {
    data: class {
        id
        name
        teacher_id
    }
}
```
输入结果:
```
[ 
  { id: 1, name: '高81班' },
  { id: 2, name: '高82班' },
  { id: 3, name: '高83班' },
  { id: 4, name: '高84班' },
  { id: 5, name: '高85班' } 
]
```

- 比如说获取班级总数

```js
Class.count()
```
解析为:
```
query {
    data: class_aggregate {
        aggregate {
            count
        }
    }
}
```
输出为:
```
5
```

- 比如说同时数据和总数

```js
Class.query({ limit: 3 })
```
解析为:
```
query {
    data: class (limit: 3) {
        id
        name
        teacher_id
    }
    data1: class_aggregate {
        aggregate {
            count
        }
    }
}
```
输出为：
```
{
  "rows": [
    {
      "id": 1,
      "name": "高81班",
      "teacher_id": 1
    },
    {
      "id": 2,
      "name": "高82班",
      "teacher_id": 2
    },
    {
      "id": 3,
      "name": "高83班",
      "teacher_id": 3
    }
  ],
  "total": 5
}
```

- 比如说获取指定id的班级信息

```js
Class.getByPk(1)
```
解析为:
```
query {
    data: class_by_pk (id: 1) {
        id
        name
    }
}
```
输出为:
```
{ id: 1, name: '高81班', teacher_id: 1 }
```

- 比如说获取第一条记录, 该方法是在拿到所有数据之后取的第一条记录

```js
Class.first()
```
解析为:
```
query {
    data: class {
        id
        name
    }
}
```
输出为：
```
{ id: 2, name: '高82班' }
```

- 比如说在查询时传入参数

```js
Class.find({ order_by: { id: 'desc' }, limit: 3 })
```
解析为：
```
query {
    data: class (order_by: {id: desc}) {
        id
        name
    }
}
```
输出为：
```
[ { id: 5, name: '高85班', teacher_id: 5 },
  { id: 4, name: '高84班', teacher_id: 4 },
  { id: 3, name: '高83班', teacher_id: 3 } ]
```
```js
Class.find({ where: { name: {_eq: '高83班'} } })
```
解析为：
```
query {
    data: class (where: {name: {_eq: "高83班"}}) {
        id
        name
    }
}
```
输出为：
```
[ { id: 3, name: '高83班' } ]
```
此类情况，你可以用`first`的方法，输出为:
```
{ id: 3, name: '高83班' }
```

### 嵌套数据查询

- 获取嵌套数据，比如说获取`高81班`的学生`students`以及班主任`teacher`以及`其他老师`的数据

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'teacher': true,
      'students': true,
      'class_teacher_maps.teacher': true
    }
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        teacher_id
        teacher {
            id
            name
            number
        }
        students {
            id
            name
            number
            class_id
        }
        class_teacher_maps {
            id
            teacher_id
            class_id
            teacher {
                id
                name
                number
            }
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teacher": {
      "id": 1,
      "name": "魏老师",
      "number": 13
    },
    "students": [
      {
        "id": 1,
        "name": "学生1",
        "number": 71,
        "class_id": 1
      },
      {
        "id": 2,
        "name": "学生2",
        "number": 72,
        "class_id": 1
      },
      {
        "id": 3,
        "name": "学生3",
        "number": 73,
        "class_id": 1
      },
      {
        "id": 4,
        "name": "学生4",
        "number": 74,
        "class_id": 1
      },
      {
        "id": 5,
        "name": "学生5",
        "number": 75,
        "class_id": 1
      },
      {
        "id": 6,
        "name": "学生6",
        "number": 76,
        "class_id": 1
      }
    ],
    "class_teacher_maps": [
      {
        "id": 13,
        "teacher_id": 1,
        "class_id": 1,
        "teacher": {
          "id": 1,
          "name": "魏老师",
          "number": 13
        }
      },
      {
        "id": 14,
        "teacher_id": 6,
        "class_id": 1,
        "teacher": {
          "id": 6,
          "name": "刘老师",
          "number": 18
        }
      }
    ]
  }
]
```

- 获取嵌套数据，并且进行传递查询参数

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'teacher': true,
      'students': { order_by: { id: 'desc' } },
      'class_teacher_maps': { limit: 1 },
      'class_teacher_maps.teacher': true
    }
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        teacher_id
        teacher {
            id
            name
            number
        }
        students (order_by: {id: desc}) {
            id
            name
            number
            class_id
        }
        class_teacher_maps (limit: 1) {
            id
            teacher_id
            class_id
            teacher {
                id
                name
                number
            }
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teacher": {
      "id": 1,
      "name": "魏老师",
      "number": 13
    },
    "students": [
      {
        "id": 6,
        "name": "学生6",
        "number": 76,
        "class_id": 1
      },
      {
        "id": 5,
        "name": "学生5",
        "number": 75,
        "class_id": 1
      },
      {
        "id": 4,
        "name": "学生4",
        "number": 74,
        "class_id": 1
      },
      {
        "id": 3,
        "name": "学生3",
        "number": 73,
        "class_id": 1
      },
      {
        "id": 2,
        "name": "学生2",
        "number": 72,
        "class_id": 1
      },
      {
        "id": 1,
        "name": "学生1",
        "number": 71,
        "class_id": 1
      }
    ],
    "class_teacher_maps": [
      {
        "id": 13,
        "teacher_id": 1,
        "class_id": 1,
        "teacher": {
          "id": 1,
          "name": "魏老师",
          "number": 13
        }
      }
    ]
  }
]
```

### 同时查询多条记录

```js
engine
  .queues(
    Class.Query.first(),
    Class.Query.count(),
    Student.Query.first(),
    Student.Query.count()
  )
  .run()
```
解析为:
```
query {
    data: class {
        id
        name
        teacher_id
    }
    data1: class_aggregate {
        aggregate {
            count
        }
    }
    data2: student {
        id
        name
        number
        class_id
    }
    data3: student_aggregate {
        aggregate {
            count
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1
  },
  5,
  {
    "id": 1,
    "name": "学生1",
    "number": 71,
    "class_id": 1
  },
  30
]
```

## Mutations

### insert

- 新增一条数据

```js
Student.insert({ name: 'LiuTengTeng', id: 31, class_id: 3 })
```
解析为:
```
mutation {
    data: insert_student (objects: [{name: "LiuTengTeng", id: 31, class_id: 3}]) {
        affected_rows
        returning {
            id
            name
            number
            class_id
        }
    }
}
```
输出为:
```
{
  "affected_rows": 1,
  "returning": [
    {
      "id": 31,
      "name": "LiuTengTeng",
      "number": 101,
      "class_id": 3
    }
  ]
}
```

- 新增数据并且嵌套返回

```js
Student
  .insert({
    name: 'LiuTengTeng2',
    id: 32,
    class_id: 3
  }, null, {
    include: {
      class: true
    }
  })
```
解析为:
```
mutation {
    data: insert_student (objects: [{name: "LiuTengTeng2", id: 32, class_id: 3}]) {
        affected_rows
        returning {
            id
            name
            number
            class_id
            class {
                id
                name
                teacher_id
            }
        }
    }
}
```
输出为:
```
{
  "affected_rows": 1,
  "returning": [
    {
      "id": 32,
      "name": "LiuTengTeng2",
      "number": 102,
      "class_id": 3,
      "class": {
        "id": 3,
        "name": "高83班",
        "teacher_id": 3
      }
    }
  ]
}
```

- 嵌套新增，并且嵌套返回

```js
Student
  .insert({
    name: 'LiuTengTeng3',
    id: 33,
    class: {
      data: {
        id: 6,
        name: '高86班',
        teacher_id: 6
      }
    }
  }, null, {
    include: {
      'class.teacher': true
    }
  })
```
解析为:
```
mutation {
    data: insert_student (objects: [{name: "LiuTengTeng3", id: 33, class: {data: {id: 6, name: "高86班", teacher_id: 6}}}]) {
        affected_rows
        returning {
            id
            name
            number
            class_id
            class {
                id
                name
                teacher_id
                teacher {
                    id
                    name
                    number
                }
            }
        }
    }
}
```
输出为:
```
{
  "affected_rows": 2,
  "returning": [
    {
      "class_id": 6,
      "name": "LiuTengTeng3",
      "id": 33,
      "number": 103,
      "class": {
        "teacher_id": 6,
        "teacher": {
          "name": "刘老师",
          "id": 6,
          "number": 18
        },
        "name": "高86班",
        "id": 6
      }
    }
  ]
}
```

### update

- 更新数据

```js
Student.update(33, { name: "ltt" })
// or
Student.update({ id: { _eq: 33 } }, { name: "ltt" })
```
解析为:
```
mutation {
    data: update_student (where: {id: {_eq: 33}}, _set: {name: "ltt"}) {
        affected_rows
        returning {
            id
            name
            number
            class_id
        }
    }
}
```
输出为:
```
{
  "affected_rows": 1,
  "returning": [
    {
      "id": 33,
      "name": "ltt",
      "number": 103,
      "class_id": 6
    }
  ]
}
```

### increment

- 对int类型的字段，进行批量的加减操作，比如把所有学生的`number` + 5

```js
Student.increment({}, { number: 5 })
```
解析为:
```
mutation {
    data: update_student (where: {}, _inc: {number: 5}) {
        affected_rows
        returning {
            id
            name
            number
            class_id
        }
    }
}
```
输出为:
```
{
  "affected_rows": 32,
  "returning": [
    {
      "id": 1,
      "name": "学生1",
      "number": 76,
      "class_id": 1
    },
    {
      "id": 2,
      "name": "学生2",
      "number": 77,
      "class_id": 1
    },
    {
      "id": 3,
      "name": "学生3",
      "number": 78,
      "class_id": 1
    },
    {
      "id": 4,
      "name": "学生4",
      "number": 79,
      "class_id": 1
    },
    {
      "id": 5,
      "name": "学生5",
      "number": 80,
      "class_id": 1
    },
    {
      "id": 6,
      "name": "学生6",
      "number": 81,
      "class_id": 1
    },
    {
      "id": 7,
      "name": "学生7",
      "number": 82,
      "class_id": 2
    },
    {
      "id": 8,
      "name": "学生8",
      "number": 83,
      "class_id": 2
    },
    {
      "id": 9,
      "name": "学生9",
      "number": 84,
      "class_id": 2
    },
    {
      "id": 10,
      "name": "学生10",
      "number": 85,
      "class_id": 2
    },
    {
      "id": 11,
      "name": "学生11",
      "number": 86,
      "class_id": 2
    },
    {
      "id": 12,
      "name": "学生12",
      "number": 87,
      "class_id": 2
    },
    {
      "id": 13,
      "name": "学生13",
      "number": 88,
      "class_id": 3
    },
    {
      "id": 14,
      "name": "学生14",
      "number": 89,
      "class_id": 3
    },
    {
      "id": 15,
      "name": "学生15",
      "number": 90,
      "class_id": 3
    },
    {
      "id": 16,
      "name": "学生16",
      "number": 91,
      "class_id": 3
    },
    {
      "id": 17,
      "name": "学生17",
      "number": 92,
      "class_id": 3
    },
    {
      "id": 18,
      "name": "学生18",
      "number": 93,
      "class_id": 3
    },
    {
      "id": 19,
      "name": "学生19",
      "number": 94,
      "class_id": 4
    },
    {
      "id": 20,
      "name": "学生20",
      "number": 95,
      "class_id": 4
    },
    {
      "id": 21,
      "name": "学生21",
      "number": 96,
      "class_id": 4
    },
    {
      "id": 22,
      "name": "学生22",
      "number": 97,
      "class_id": 4
    },
    {
      "id": 23,
      "name": "学生23",
      "number": 98,
      "class_id": 4
    },
    {
      "id": 24,
      "name": "学生24",
      "number": 99,
      "class_id": 4
    },
    {
      "id": 25,
      "name": "学生25",
      "number": 100,
      "class_id": 5
    },
    {
      "id": 26,
      "name": "学生26",
      "number": 101,
      "class_id": 5
    },
    {
      "id": 27,
      "name": "学生27",
      "number": 102,
      "class_id": 5
    },
    {
      "id": 28,
      "name": "学生28",
      "number": 103,
      "class_id": 5
    },
    {
      "id": 29,
      "name": "学生29",
      "number": 104,
      "class_id": 5
    },
    {
      "id": 30,
      "name": "学生30",
      "number": 105,
      "class_id": 5
    },
    {
      "id": 31,
      "name": "LiuTengTeng",
      "number": 106,
      "class_id": 3
    },
    {
      "id": 32,
      "name": "LiuTengTeng2",
      "number": 107,
      "class_id": 3
    }
  ]
}
```

### delete

- 删除数据

```js
Student.delete(33)
// or
Student.update({ id: { _eq: 33 } })
```
解析为:
```
mutation {
    data: delete_student (where: {id: {_eq: 33}}) {
        affected_rows
        returning {
            id
            name
            number
            class_id
        }
    }
}
```
输出为:
```
{
  "affected_rows": 1,
  "returning": [
    {
      "id": 33,
      "name": "ltt",
      "number": 103,
      "class_id": 6
    }
  ]
}
```

### 同时执行多条操作

- 比如说我们同时执行，删除和更新操作
```js
engine
  .queues(
    Student.Mutation.delete({ name: { _eq: 'LiuTengTeng2' } }),
    Student.Mutation.update({ name: { _eq: 'LiuTengTeng' } }, { name: 'ltt' })
  )
  .run()
```
解析为:
```
mutation {
    data: delete_student (where: {name: {_eq: "LiuTengTeng2"}}) {
        affected_rows
        returning {
            id
            name
            number
            class_id
        }
    }
    data1: update_student (where: {name: {_eq: "LiuTengTeng"}}, _set: {name: "ltt"}) {
        affected_rows
        returning {
            id
            name
            number
            class_id
        }
    }
}
```
输出为:
```
[
  {
    "affected_rows": 1,
    "returning": [
      {
        "id": 32,
        "name": "LiuTengTeng2",
        "number": 107,
        "class_id": 3
      }
    ]
  },
  {
    "affected_rows": 1,
    "returning": [
      {
        "id": 31,
        "name": "ltt",
        "number": 106,
        "class_id": 3
      }
    ]
  }
]
```

## Subscriptions

- 订阅表数据
```js
Student
  .subscribe({ limit: 2 })
  .subscribe(res => {
    console.log(JSON.stringify(res, null, 4))
  })
```
解析为:
```
subscription {
    data: student (limit: 2) {
        id
        name
        number
        class_id
    }
}
```
输出为:
```
{
    "data": [
        {
            "id": 1,
            "name": "学生1",
            "number": 76,
            "class_id": 1
        },
        {
            "id": 2,
            "name": "学生2",
            "number": 77,
            "class_id": 1
        }
    ]
}
```

- 订阅嵌套表数据
```js
Student
  .subscribe({ limit: 2 }, { include: { class: true } })
  .subscribe(res => {
    console.log(JSON.stringify(res, null, 4))
  })
```
解析为:
```
subscription {
    data: student (limit: 2) {
        id
        name
        number
        class_id
        class {
            id
            name
            teacher_id
        }
    }
}
```
输出为:
```
{
    "data": [
        {
            "id": 1,
            "name": "学生1",
            "number": 76,
            "class_id": 1,
            "class": {
                "id": 1,
                "name": "高81班",
                "teacher_id": 1
            }
        },
        {
            "id": 2,
            "name": "学生2",
            "number": 77,
            "class_id": 1,
            "class": {
                "id": 1,
                "name": "高81班",
                "teacher_id": 1
            }
        }
    ]
}
```

## 配置项

### fields

使用fields, 可以指定查询需要哪些字段，默认情况下拿到全部已经声明的字段

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    fields: ['id', 'name'],
    include: {
      students: [null, {
        fields: ['id', 'name']
      }]
    }
  })
  .then(res => {
    console.log(res)
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        students {
            id
            name
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "students": [
      {
        "id": 1,
        "name": "学生1"
      },
      {
        "id": 2,
        "name": "学生2"
      },
      {
        "id": 3,
        "name": "学生3"
      },
      {
        "id": 4,
        "name": "学生4"
      },
      {
        "id": 5,
        "name": "学生5"
      },
      {
        "id": 6,
        "name": "学生6"
      }
    ]
  }
]
```

### exclude

使用exclude，可以排除掉你不想要的字段

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    exclude: ['teacher_id', 'students.class_id'],
    include: { students: true }
  })
  .then(res => {
    console.log(res)
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        students {
            id
            name
            number
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "students": [
      {
        "id": 1,
        "name": "学生1",
        "number": 76
      },
      {
        "id": 2,
        "name": "学生2",
        "number": 77
      },
      {
        "id": 3,
        "name": "学生3",
        "number": 78
      },
      {
        "id": 4,
        "name": "学生4",
        "number": 79
      },
      {
        "id": 5,
        "name": "学生5",
        "number": 80
      },
      {
        "id": 6,
        "name": "学生6",
        "number": 81
      }
    ]
  }
]
```

### rename

使用rename, 可以对查询的的字段进行重命名

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'class_teacher_maps.teacher': true
    },
    rename: ["class_teacher_maps:teachers"]
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        teacher_id
        teachers:class_teacher_maps {
            id
            teacher_id
            class_id
            teacher {
                id
                name
                number
            }
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teachers": [
      {
        "id": 13,
        "teacher_id": 1,
        "class_id": 1,
        "teacher": {
          "id": 1,
          "name": "魏老师",
          "number": 13
        }
      },
      {
        "id": 14,
        "teacher_id": 6,
        "class_id": 1,
        "teacher": {
          "id": 6,
          "name": "刘老师",
          "number": 18
        }
      }
    ]
  }
]
```

### include

使用include，将关联的表查询下来

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'students': true,
      'teacher': true,
      'class_teacher_maps': true,
      'class_teacher_maps.teacher': true
    }
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        teacher_id
        students {
            id
            name
            number
            class_id
        }
        teacher {
            id
            name
            number
        }
        class_teacher_maps {
            id
            teacher_id
            class_id
            teacher {
                id
                name
                number
            }
        }
    }
}
```

### _ (lodash指令)

因为hasura后台未支持lodash指令，所有的指令运算都是在本地进行的

- 使用`map`方法处理数据，比如说获取班级所关联的老师，去掉中间表的数据

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    rename: ['class_teacher_maps:teachers'],
    include: {
      'class_teacher_maps.teacher': true
    },
    _: {
      'class_teacher_maps:map': "teacher"
    }
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        teacher_id
        teachers:class_teacher_maps @_(map: "teacher") {
            id
            teacher_id
            class_id
            teacher {
                id
                name
                number
            }
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teachers": [
      {
        "id": 1,
        "name": "魏老师",
        "number": 13
      },
      {
        "id": 6,
        "name": "刘老师",
        "number": 18
      }
    ]
  }
]
```

- 使用`get`方法处理数据，比如说获取班级的班主任的名称

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'teacher': true
    },
    _: {
      'teacher:get': "name"
    },
    rename: ['teacher:teacher_name']
 })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) {
        id
        name
        teacher_id
        teacher_name:teacher @_(get: "name") {
            id
            name
            number
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teacher_name": "魏老师"
  }
]
```

- 使用`promote`方法，提升多个字段，比如获取班级的班主任名称以及其工号

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'teacher': true
    },
    _: {
      promote: {
        teacher: ['name:teacher_name', 'number:teacher_number']
      }
    }
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) @_(promote: {teacher: ["name:teacher_name", "number:teacher_number"]}) {
        id
        name
        teacher_id
        teacher {
            id
            name
            number
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teacher": {
      "id": 1,
      "name": "魏老师",
      "number": 13
    },
    "teacher_name": "魏老师",
    "teacher_number": 13
  }
]
```

- 使用`rename`方法，来重命名

```js
Class
  .find({
    where: { name: { _eq: '高81班' } }
  }, {
    include: {
      'class_teacher_maps.teacher': true
    },
    _: {
      'rename': ['class_teacher_maps:teachers'],
      'class_teacher_maps:rename': ['teacher_id:t_id', 'class_id:c_id'],
      'class_teacher_maps.teacher:rename': ['name:teacher_name']
    }
  })
```
解析为:
```
query {
    data: class (where: {name: {_eq: "高81班"}}) @_(rename: ["class_teacher_maps:teachers"]) {
        id
        name
        teacher_id
        class_teacher_maps @_(rename: ["teacher_id:t_id", "class_id:c_id"]) {
            id
            teacher_id
            class_id
            teacher @_(rename: ["name:teacher_name"]) {
                id
                name
                number
            }
        }
    }
}
```
输出为:
```
[
  {
    "id": 1,
    "name": "高81班",
    "teacher_id": 1,
    "teachers": [
      {
        "id": 13,
        "teacher": {
          "id": 1,
          "number": 13,
          "teacher_name": "魏老师"
        },
        "t_id": 1,
        "c_id": 1
      },
      {
        "id": 14,
        "teacher": {
          "id": 6,
          "number": 18,
          "teacher_name": "刘老师"
        },
        "t_id": 6,
        "c_id": 1
      }
    ]
  }
]
```

以上为常用的几种方法，更多方法见下面清单对应使用方法见lodash官方文档，如需定制化可以提出`新需求`

```js
const transformations = {
  Array: {
    each: (array, arg) => {
      return map(array, item => applyTransformations(item, arg))
    },
    map,
    keyBy,
    chunk,
    drop,
    dropRight,
    take,
    takeRight,
    flattenDepth,
    fromPairs,
    nth,
    reverse,
    uniq,
    uniqBy,
    countBy,
    filter,
    reject,
    filterIf: (array, arg) => {
      return filter(array, item => applyTransformations(item, arg))
    },
    rejectIf: (array, arg) => {
      return reject(array, item => applyTransformations(item, arg))
    },
    groupBy,
    sortBy,
    minBy,
    maxBy,
    meanBy,
    sumBy,
    join,
    count,
    promote
  },
  Object: {
    get,
    mapValues,
    at,
    toPairs,
    invert,
    invertBy,
    keys,
    values,
    formatGeoPoint
  },
  Number: {
    lt,
    lte,
    gt,
    gte,
    eq
  },
  String: {
    startsWith,
    endsWith,
    toUpper,
    toLower,
    toJSON,
    toNumber,
    parseInt,
    split,
    trim
  }
}
```
