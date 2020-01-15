const {fromEvent} = require("rxjs")
const {map} = require("rxjs/operators")

const source = fromEvent(document, "click")

const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));

const subscribe = example.subscribe(console.log)