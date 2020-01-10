class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function(...list) {
    console.log(list);
    console.log(`Calling ${name} with`, ...list);
    return oldValue.call(this, ...list);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
let result = math.add(2, 4);

console.log(result)