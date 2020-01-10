//防抖

function debounce(fn, wait, immediate){
    let timer = null;
    let context = this;
    if(immediate && !timer) {
        context::fn(...arguments)
    }
    if(timer) clearTimeout(timer);
    timer = setTimeout(() =>{
        fn.call(context, arguments)
    },wait)
}