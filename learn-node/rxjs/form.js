const {from}  = require('rxjs')

let arr = [
	{value: 1, label: 1},
	{value: 2, label: 2},
	{value: 3, label: 3},
	{value: 4, label: 4}
]
// from 将array 转为observable
const arraySource = from(arr)

const subscribe1 = arraySource.subscribe(val => console.log(val))


// from 将 promise 转为 observable
const promiseSource = from(new Promise(resolve => resolve('hello world')));

const subscribe2 = promiseSource.subscribe(val => console.log(val));


// 转换集合
 
const map = new Map();
map.set(1,"hi")
map.set(2,'bay')

console.log(map)
const mapSource = from(map)
console.log(mapSource)

const subscribe3 = mapSource.subscribe(val => console.log(val))


