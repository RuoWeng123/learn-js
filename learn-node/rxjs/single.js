//发出通过表达式的 单一项

const {from} = require('rxjs')

const {single} = require("rxjs/operators")

const source = from([1,2,3,4,5]);

const example = source.pipe(single(val => val ===2));

const subscribe = example.subscribe(val => console.log(val))

//single过滤操作 输出结果是唯一值, filter输出结果是多个