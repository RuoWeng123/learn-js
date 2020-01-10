// 冒泡排序  内部循环 每次比对，只要当前值大于后一位 将当前值推后一位

function bubbleSort(arr) { 
	let length = arr.length;
	for (let i = 0; i < length; i++) { 
		for (let j = 0; j < length -1-i; j++) { 
			if (arr[j] > arr[j + 1]) { 
				[arr[j] ,arr[j+1]] = [arr[j+1], arr[j]]
 			}
		}
	}
}