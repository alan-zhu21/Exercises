const ExpressError = require('./error');

function ConvertToNum(value) {
	if (!isNaN(value)) {
		return Number(value);
	} else {
		throw new ExpressError(`${value} is not a number.`, 400);
	}
}

function getMean(array) {
	let sum = 0;
	for (num of array) {
		sum += ConvertToNum(num);
	}
	return sum / array.length;
}

function getMedian(array) {
	let new_array = [];
	for (num of array) {
		new_array.push(ConvertToNum(num));
	}
	let sorted = new_array.sort((a, b) => a - b);
	let length = sorted.length;
	if (length % 2 === 0) {
		return (sorted[length / 2 - 1] + sorted[length / 2]) / 2; //get the two middle numbers
	} else {
		return sorted[Math.floor(length / 2)];
	}
}

function getMode(array) {
	let num_count = {};
	for (num of array) {
		let num_version = ConvertToNum(num);
		if (num_count[`${num_version}`]) {
			num_count[`${num_version}`] += 1;
		} else {
			num_count[`${num_version}`] = 1;
		}
	}
	return Number(Object.keys(num_count).reduce((a, b) => (num_count[a] > num_count[b] ? a : b)));
}

function processQuery(obj) {
	let str_of_nums = obj.nums;
	let t = str_of_nums.split(',');
	return t;
}

module.exports = {
	processQuery,
	ConvertToNum,
	getMean,
	getMedian,
	getMode
};
