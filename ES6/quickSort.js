
function quickSort(arr, left, right){
  let len = arr.length;
  let partitionIndex;
  let left = typeof left !='number' ? 0 : left;
  let right = typeof right !='number' ? 0 : right;

  if(left < right){
    partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex -1);
    quickSort(arr, partitionIndex+1, right)
  }
  return arr
}

function partition(arr, left, right){
  let pivot = left,
      index = pivot +1;
  for(var i = index; i<right; i++){
    if(arr[i] < arr[pivot]){
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index-1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
