function countZeroes(arr) {
	let start = arr.indexOf(0);
	let numOfZeros = arr.length - start;
	return numOfZeros;
}

module.exports = countZeroes;
