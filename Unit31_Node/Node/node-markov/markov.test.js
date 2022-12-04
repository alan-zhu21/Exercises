let mm = require('./markov.js');

describe('Markov Machine tests', () => {
	let mmt;
	beforeAll(() => {
		mmt = new mm.MarkovMachine('test string');
		return mmt;
	});

	test('makeChains method should return an object', () => {
		let test = mmt.mc instanceof Object;
		expect(test).toBe(true);
	});

	test('makeText method should return a string', () => {
		let test = typeof mmt.makeText() === 'string';
		expect(test).toBe(true);
	});
});
