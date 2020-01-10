const { formEvent } = require('rxjs')
const { timer } = require("rxjs")

const { debounceTime } = require("rxjs/operators")
const { map } = require("rxjs/operators")

const input = document.getElementById("example")

//每次键盘输入都将映射成当前输入值
const example = formEvent(input, 'keyup').pipe(map(i => i.currentTarget.value));


//两次敲击时间小于500ms 丢弃这之间键入的值
const debounceInput = example.pipe(debounceTime(500))

const subscribe = debounceInput.subscribe(val => {
	console.log("==",val)
})

