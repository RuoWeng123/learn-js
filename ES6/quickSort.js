function quickSort(arr){
  let length = arr.length;
  if(length<=1) return arr;
  let pivotIndex = Math.floor(length /2);
  let pivot = arr.splice(pivotIndex, 1)[0];

  let left = [];
  let right = [];
  for(let i = 0; i< length; i++){
    if(arr[i] < pivot){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}


let arr = [5,47,28,2,9,66,30,41,10,55]

let sortArr = quickSort(arr)

console.log(sortArr)