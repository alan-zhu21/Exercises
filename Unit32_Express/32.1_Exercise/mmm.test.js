const { processQuery, ConvertToNum, getMean, getMedian, getMode } = require('./helpers');

describe('mean tests', function() {
	test('finds the mean of an array', function() {
		expect(getMean([ 1, 5, 10 ])).toBeCloseTo(5.3333333);
	});
	test('throws an error if there is a non number in the array', function() {
		expect(() => getMean([ 1, 3, 10, 'string' ])).toThrow();
	});
});

describe('median tests', function() {
	test('finds the median of odd numbered array', function() {
		expect(getMedian([ 1, 5, 9, 100, 101 ])).toEqual(9);
	});
	test('finds the median of even numbered array', function() {
		expect(getMedian([ 1, 5, 9, 100 ])).toEqual(7);
	});
	test('throws an error if there is a non number in the array', function() {
		expect(() => getMedian([ 1, 3, 10, 'string' ])).toThrow();
	});
});

describe('mode tests', function() {
	test('finds mode', function() {
		expect(getMode([ 1, 2, 5, 7, 7, 1, 1 ])).toEqual(1);
	});
	test('throws an error if there is a non number in the array', function() {
		expect(() => getMode([ 1, 3, 10, 'string' ])).toThrow();
	});
});
