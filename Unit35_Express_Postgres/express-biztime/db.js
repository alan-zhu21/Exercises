/** Database setup for BizTime. */

const password = require('./secret');
const { Client } = require('pg');

const client = new Client({
	connectionString: 'postgresql:///biztime',
	password: `${password}`
});

client.connect();

module.exports = client;
