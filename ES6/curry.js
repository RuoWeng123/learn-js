//  柯里化

function curry(fn, curArgs){
    let args = [...arguments]

    if(curArgs !== undefined){
        args = [...args, ...curArgs]
    }

    if(args.length < fn.length){
        return curry(fn, args)
    }

    return fn.apply(null, args)
}

let sum = function(a,b,c){
    console.log(a+b+c)
}

let fn = curry(sum)

fn(1)(2)(3)
fn(1,2)(3)