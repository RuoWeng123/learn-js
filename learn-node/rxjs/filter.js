const {from} = require("rxjs")

const {filter} = require("rxjs/operators")

let arr = [
	{name:"ruoweng", age: 27},
	{name:"lily", age: 33}
]
const source = from(arr);

const example = source.pipe(filter(person => person.age < 30));

const subscribe = example.subscribe(val => console.log(`name:${val.name}`))

