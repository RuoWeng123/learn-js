function mergeSort(arr){
  let len = arr.length;
  if(len < 2){
    return arr;
  }
  let middle = Math.floor(len / 2),
      left = arr.slice(0, middle),
      right = arr.slice(middle);
  return merge(mergeSort(left),mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while(left.length && right.length) {
    if(left[0] < right[0]) {
      result.push(left.shift())
    }else{
      right.push(right.shift())
    }
  }
  while(left.length) {
    result.push(left.shift())
  }
  while(right.lengt){
    result.push(right.shift())
  }
  return result
}