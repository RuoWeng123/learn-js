let R  = require('ramda')
const list = [
	{name:"motherboard", manufacturer:'A', price: 65},
	{name:"CPU", manufacturer:'A', price: 240},
	{name:"DRAM", manufacturer:'B', price: 100},
	{name:"CPU", manufacturer:'B', price: 150},
]

const map = fn => array => arrar.map(fn);
const average = items =>{
	return items.length ===0 ? 0 : R.sum(items)/items.length
}

const clacAvgCost = (items, filterFn = () => true) =>{
	let tempArr =  R.pipe(
		R.filter(filterFn),
		R.map(R.prop('price'))
		)(items)

	return R.sum(tempArr)/R.length(tempArr)
}

let response = clacAvgCost(list, item =>{ return item.name === 'CPU'})

console.log(response)