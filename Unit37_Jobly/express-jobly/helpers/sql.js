const { BadRequestError } = require('../expressError');

// This is a helper function that takes in two arguments, 1 is an object, dataToUpdate, with values to-be-converted to a string of columns and the other, jsToSql, creates a list of column names to be used in the db.query.

// ex. for patch route for companies: sqlForPartialUpdate({name, description, numEmployees, logo_url}, { description: "tech", numEmployees: 1000, logo_url: "https://apple.com" }) => { setCols: 'name, description, numEmployees, logo_url', values: ['apple', 'tech', 1000, 'http://apple.com'] }

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate)
	};
}

module.exports = { sqlForPartialUpdate };
