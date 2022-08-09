function findRotationCount(arr) {
	let idx_of_max = arr.indexOf(Math.max(...arr));
	if (idx_of_max + 1 === arr.length) {
		return 0;
	} else {
		return idx_of_max + 1;
	}
}

module.exports = findRotationCount;
