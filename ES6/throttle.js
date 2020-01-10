//截流 
function throttle(fn, wait, immediate) {
    let timer = null;
    let callNow = immediate;
    
    let context = this;
    if(callNow) {
        context::fn(...arguments)
        callNow = false;
    }

    if(!timer){
        
        timer = setTimeout(() =>{
            context::fn(...arguments)
            timer = null
        }, wait)
    }
}