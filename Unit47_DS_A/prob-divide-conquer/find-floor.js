function findFloor(arr, tgt) {
	let mid_idx = Math.ceil(arr.length / 2);
	if (tgt > Math.max(...arr)) {
		return arr.at(-1);
	} else if (arr.at(mid_idx) > tgt) {
		for (let i = arr.slice(0, mid_idx).length - 1; i >= 0; i--) {
			if (arr.at(i - 1) < tgt && arr.at(i) >= tgt) {
				return arr.at(i - 1);
			}
		}
	} else if (arr.at(mid_idx) < tgt) {
		let new_arr = arr.slice(mid_idx);
		for (let i = 0; i <= new_arr.length; i++) {
			if (new_arr.at(i) <= tgt && new_arr.at(i + 1) > tgt) {
				return arr.at(+i + +mid_idx);
			}
		}
	} else {
		return arr.at(mid_idx);
	}
	return -1;
}

module.exports = findFloor;
