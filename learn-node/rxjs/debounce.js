//防抖操作

const {of} = require("rxjs")
const {timer} = require("rxjs")

const {debounce} = require("rxjs/operators")

const example = of("wait","one","second","last will display");

const deounceExample = example.pipe(debounce(() => timer(1000)));

const subrice = deounceExample.subscribe(val => console.log(val))

const subrice2 = example.subscribe(val => console.log(val))

//基于interval 的 debounce

const {interval} = require("rxjs")
const {take} = require("rxjs/operators")
const source = interval(1000).pipe(take(5))

const debounceInterval = source.pipe(debounce(val => timer(val * 200)));

const subriceinterval = debounceInterval.subscribe(val => console.log(val))


//使用场景:
// 之前为了确定interval要执行几次,使用take(num)方法.获取interval前num次的 结果
// 现在 使用debounce( val => timer(val * 200))  结果只会执行五次,因为 debounce的时间会大雨interval的时间.之后的结果会被丢弃. 

// 但是测试发现,interval并没有被释放掉.  

//take(5)。5次后会输出 finished in timer.   但是使用debounce并不会有finished。in timer