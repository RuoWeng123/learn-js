function myPromise(constructor){
  let self = this;
  self.status = "pending"
  self.value = undefined;
  self.reson = undefined;
  self.onFullfilledArray = [];
  self.onRejectedArray = []

  function resolve(value){
    if(self.status === "pending"){
      self.value = value;
      self.status = "resolved";
      self.onFullfilledArray.forEach(function(f){
        f(self.value)
      })
    }
  }
  function reject(reson){
    if(self.status === "pending"){
      self.reson = reson;
      self.status = "rejected";
      self.onRejectedArray.forEach(function(f){
        f(self.reson)
      })
    }
  }

  try{
    constructor(resolve,reject)
  }catch{
    reject(e)
  }
}

mypromise.prototype.then = function(onFullfilled, onRejected){
  let self = this;
  let promise2;
  switch(self.status){
    case "pending":
    promise2 = new myPromise(function(resolve, reject){
      self.onFullfilledArray.push(function(){
        setTimeout(function(){
          try{
            let temp = onFullfilled(self.value)
            resolvePromise(temple)
          }catch(e){
            reject(e)
          }
        })
      })
      self.onRejectedArray.push(function(){
        setTimeout(function(){
          try{
            let temple = onRejected(self.name)
            resolvePromise(temple)
          }catch(e){
            reject(e)
          }
        })
      })
    })
    case "resolved":
      promise2 = new myPromise(function(resolve, reject){
        setTimeout(function(){
          try{
            let temple = onFullfilled(self.value)
            resolvePromise(temple)
          }catch(e){
            reject(e)
          }
        })
      })
      break;
    case "rejected":
      promise2 = new myPromise(function(resolve, reject){
        setTimeout(function(){
          try{
            let temple = onRejected(self.reson)
            resolvePromise(temple)
          }catch(e){
            reject(e)
          }
        })
      })
      break;
    default;
  }
  return promise2
}

function resolvePromise(promise,x,resolve,reject){
  if(promise === x){
    throw new TypeError("type error")
  }
  let isUsed;
  if(x!== null && (typeOf x === "object" || type x === "function")){
    try{
      let then = x.then;
      if(typeof then==="function"){
           //是一个promise的情况
           then.call(x,function(y){
              if(isUsed)return;
              isUsed=true;
              resolvePromise(promise,y,resolve,reject);
           },function(e){
              if(isUsed)return;
              isUsed=true;
              reject(e);
           })
        }else{
           //仅仅是一个函数或者是对象
           resolve(x)
        }
    }catch(e){

    }
  }else{
    resolve(x)
  }
}