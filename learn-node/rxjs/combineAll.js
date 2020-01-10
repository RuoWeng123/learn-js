const  {take} =  require('rxjs/operators');
const  {map} =  require('rxjs/operators');
const  {combineAll} =  require('rxjs/operators');
const {interval}  = require('rxjs')

const source = interval(1200).pipe(take(2))

const example = source.pipe(
	map(val => interval(1000).pipe(
			map(i => `Result (${val}):${i}`,take(5))
		))
	);

const combined = example.pipe(combineAll())


const subscribe = combined.subscribe(val => console.log(val))