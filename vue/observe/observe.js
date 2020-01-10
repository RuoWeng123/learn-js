//observe.js
 function defineReactive(data,key,val){
 	observe(val)
 	var dep = new Dep();
 	Object.defineProperty(data, key, {
 		enumerable:true,
 		configurable: true,
 		get: function(){
 			if(Dep.target){
 				dep.addSub(Dep.target)
 			}
 			return val
 		},
 		set: function(newVal){
 			if(val === newVal){
 				return
 			}
 			val = newVal;
 			console.log()
 			dep.notify()
 		}
 	})
 }

Dep.target = null;

function observe(data){
 	if(!data || typeof data !== 'object') return

 	Object.keys(data).forEach(function(key){
 		defineReactive(data, key, data[key]);
 	})
}


function Dep(){
	this.subs = []
}

Dep.prototype = {
	addSub: function(){
		this.subs.push(sub)
	},
	notify: function(){
		this.subs.forEach(item =>{
			item.update()
		})
	}
}

 var library = {
 	book1:{
 		name:""
 	},
 	book2:""
 }
