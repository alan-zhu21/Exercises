/** Database setup for BizTime. */

const { Client } = require('pg');

let db;

if (process.env.NODE_ENV === 'test') {
	db = new Client({
		connectionString: 'postgresql:///biztime_test'
	});
} else {
	db = new Client({
		connectionString: 'postgresql:///biztime'
	});
}

db.connect();

module.exports = db;
