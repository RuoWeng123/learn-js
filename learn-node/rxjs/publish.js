const {interval}  = require('rxjs')
const {publish} = require('rxjs/operators');
const {tap} = require('rxjs/operators');
const {take} = require('rxjs/operators');

const source = interval(1000).pipe(take(5))

const example = source.pipe(
		tap(_ => console.log("do something")),
		publish()
	);

const subscribe = example.subscribe(val =>{

	console.log(`subscribe one : ${val}` )
})

const subscribeTwo = example.subscribe(val =>{
	console.log(`subscribe two : ${val}`)
})


setTimeout(() =>{
	example.connect();
},2000)



多播方式
