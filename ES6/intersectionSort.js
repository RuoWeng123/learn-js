// 插入排序  拿出当前值，逆向比对，当不小于前一个值  插入当前位置

function intersectionSort(arr) { 
	let len = arr.length;
	let target, preIndex;
	for (let i = 0; i < len; i++) { 
		target = arr[i];
		preIndex = i - 1;
		while (preIndex >= 0 && arr[preIndex] > target) { 
			arr[preIndex + 1] = arr[preIndex]
			preIndex--;
		}
		arr[preIndex+1] = target
	}
	return arr
}