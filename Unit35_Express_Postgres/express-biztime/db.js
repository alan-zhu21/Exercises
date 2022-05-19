/** Database setup for BizTime. */

const { Client } = require('pg');

let db = new Client({
	connectionString: 'postgresql:///biztime'
});

db.connect();

module.exports = db;
