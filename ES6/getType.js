function getType(obj){
	if(obj === null) return String(obj);
	//return typeof obj === "object" ? Object.prototype.toString.call(obj).replace('[object','').replace(']','') : typeof obj
	return typeof obj === "object" ? Object.prototype.toString.call(obj) : typeof obj
}

console.log(getType(true))