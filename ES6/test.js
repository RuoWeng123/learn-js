function simpligyStr(str){
	let arr = str.split(",").map(v => Number(v))
	let last = undefined;
	let columnArr = arr.reduce((prev, cur) =>{
		let length = prev.length
		if(length <1) {
			prev.push(cur)
		}else{
			if(last === (cur - 1)){
				if(prev[length - 2] === "~"){
					prev.splice(length -1, 1, cur)
				}else if (prev[length - 1] !== "~"){
					prev.push(`~${cur}`)
				}
			}else{
				prev.push(","+cur)
			}
		}
		last = cur;
		return prev
	},[])
	return columnArr.join("")
}


function transformStr(str) {
    let arr = str.split(',')
    let i = 0
    let ret = []
    for (let j = 1; j <= arr.length; j++) {
        if (arr[j] - arr[j - 1] !== 1) {
            ret.push(j - i === 1 ? arr[i] : `${arr[i]}~${arr[j - 1]}`)
            i = j
        }
    }
    return ret.join(',')
}

let a = "1,2,3,4,5,7,8,10"

let b = transformStr(a)

console.log(b)