const {from} = require("rxjs")
const {groupBy} = require("rxjs/operators")
const {mergeMap} = require("rxjs/operators")
const {toArray} = require("rxjs/operators")
const {take} = require("rxjs/operators")

const people = [
	{name:"sun",age:25},
	{name:"joe",age:30},
	{name:"frank",age:25},
	{name:"sarah",age:35}
]

const source = from(people)

const example = source.pipe(
		groupBy(person => person.age),
		mergeMap(group => group.pipe(toArray()))
	)

const subscribe = example.subscribe(console.log)


//groupBy response observables(这是一个内部流不能被直接subscribe
//. . 需要mergeMap 来将这个内部流打平