const { Observable } = require('rxjs')

const hello = Observable.create(function(observal){
	observal.next('hello');
	observal.next('world');
	let value = 0
	const interval = setInterval(() =>{
		observal.next(value)
		value++
	},2000)
	return () => clearInterval(interval)

})

const subscribe = hello.subscribe(val => console.log(val))

setTimeout(() =>{
	subscribe.unsubscribe();
}, 10000)


observable  是一个订阅机制，
该机制在内部需要返回内容得时候输出内容，当外部没有引用 该observabel 时RXJS自动销毁Observable对象。
