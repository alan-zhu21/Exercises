const request = require('supertest');
const { sqlForPartialUpdate } = require('./sql');

describe('test sql helper function', function() {
	test('returns the correctly formatted data when properly used', function() {
		const result = sqlForPartialUpdate(
			{ name: 'apple', description: 'tech', numEmployees: 1000, logo_url: 'https://apple.com' },
			{ name: 'apple', description: 'tech', numEmployees: 1000, logo_url: 'https://apple.com' }
		);
		expect(result).toEqual({
			setCols: '"apple"=$1, "tech"=$2, "1000"=$3, "https://apple.com"=$4',
			values: [ 'apple', 'tech', 1000, 'https://apple.com' ]
		});
	});
});
