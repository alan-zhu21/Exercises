function sortedFrequency(arr, tgt) {
	let start = arr.indexOf(tgt);
	let reversed = arr.reverse();
	let end = arr.length - reversed.indexOf(tgt);
	return end - start;
}

module.exports = sortedFrequency;
