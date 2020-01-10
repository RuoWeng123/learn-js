
//skip 用来跳过前n个流

const {interval} = require("rxjs")

const {skip}= require("rxjs/operators")
const {take}= require("rxjs/operators")
const {filter}= require("rxjs/operators")

const source = interval(1000).pipe(take(10))

//const example = source.pipe(skip(5))

//const subscribe = example.subscribe(val => console.log(val))



//const subscribe2 = source.pipe(skip(2)).subscribe(console.log)

const subscribe3 = source.pipe(filter(val => val > 3)).subscribe(console.log)


//.show. subscribe2Obj ang subscribe3Obj have same result
