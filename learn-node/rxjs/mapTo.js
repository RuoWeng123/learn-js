const {interval} = require('rxjs')
const {mapTo} = require('rxjs/operators')
const {take} = require('rxjs/operators')


const source = interval(2000).pipe(take(5))


const example = source.pipe(mapTo('hello world'))

const subscribe = example.subscribe(val => console.log(val))