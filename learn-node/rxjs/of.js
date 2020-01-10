const {of} = require("rxjs")

const source = of({name:"ruoweng"},[1,23],function(){return "=="})

const subscribe = source.subscribe(val => console.log(val))