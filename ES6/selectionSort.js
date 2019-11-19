// 选择排序 每次循环选出一个最小的，将最小的放在外部循环的前面

function selectionSort(arr) { 
	let len = arr.length
	var minIndex, temp;
	for (let i = 0; i < len; i++) { 
		minIndex = i;
		for (let j = i + 1; j < len; j++) { 
			if (arr[j] < arr[minIndex]) { 
				minIndex = j;
			}
		}
		temp = arr[minIndex]
		arr[i] = arr[minIndex]
		arr[minIndex]  = temp
	}
}