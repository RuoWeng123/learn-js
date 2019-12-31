function dropRepeat(arr){
	return arr.reduce((acc,cur) =>{
		const ids = acc.map(item => item.id)
		return ids.includes(cur.id) ? acc : [...acc,cur]
	},[])
}

let resonList = [
	{id:1,a:1},
	{id:2,a:2},
	{id:3,a:3},
	{id:1,a:1}
]
let a = dropRepeat(resonList)
console.log(a)


//todo 还有ramda去重方式
R.dropRepeatWith(R.prop("id"),resonList)