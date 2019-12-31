//bind.js
Function.prototype.bind = function(context, ...arg){
	if(typeof this !== "function"){
		throw new Error("not a function")
	}
	let fn = this;
	let resFn = function(..arg2){
		return fn.apply(this.instanceof resFn ? this : context, arg.concat(arg2))
	}
	const DumpFunction = function DumpFunction(){}
	DumpFunction.prototype = this.prototype;
	resFn.prototype = new DumpFunction();

	return resFn
}