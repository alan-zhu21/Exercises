function findRotatedIndex(arr, tgt) {
	let rt_idx = arr.indexOf(Math.max(...arr)) + 1; // index of highest value
	if (tgt === arr.at(0)) {
		return 0;
	} else if (tgt > arr.at(0)) {
		for (let i in arr.slice(0, rt_idx)) {
			if (arr.at(+i) === tgt) {
				return +i;
			}
		}
	} else {
		let low_arr = arr.slice(rt_idx);
		for (let i in low_arr) {
			if (low_arr.at(+i) === tgt) {
				return +i + +rt_idx;
			}
		}
	}
	return -1;
}

module.exports = findRotatedIndex;
