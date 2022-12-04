process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');
const slugify = require('slugify');

let testCompany;
let testInvoice;

beforeEach(async function() {
	let { name, description } = { name: 'testcmp', description: 'incubator' };
	let code = slugify(name, { lower: true });

	let cmpResult = await db.query(
		`
	INSERT INTO
	    companies (code, name, description) VALUES ($1, $2, $3)
	    RETURNING code, name, description`,
		[ code, name, description ]
	);
	testCompany = cmpResult.rows[0];

	let { comp_code, amt, paid, paid_date } = { comp_code: 'testcmp', amt: 50, paid: false, paid_date: null };
	let invResult = await db.query(`INSERT INTO invoices (comp_code, amt, paid, paid_date) VALUES ($1, $2, $3, $4)`, [
		comp_code,
		amt,
		paid,
		paid_date
	]);
	testInvoice = invResult.rows[0];
});

afterEach(async function() {
	await db.query('DELETE FROM companies');
	await db.query('DELETE FROM invoices');
});

afterAll(async function() {
	await db.end();
});

describe('GET /companies and /invoices', function() {
	test('It should return all companies and invoices', async () => {
		const cmp_response = await request(app).get('/companies');
		expect(cmp_response.statusCode).toEqual(200);
		expect(cmp_response.body).toEqual({ companies: [ testCompany ] });
	});
});

describe('POST /companies and /invoices', function() {
	test('It should return the newly made company', async () => {
		const cmp_response = await request(app).post('/companies').send({
			name: 'growlith',
			description: 'pokemon company'
		});
		expect(cmp_response.statusCode).toEqual(201);
		expect(cmp_response.body).toEqual({
			company: { code: expect.any(String), name: 'growlith', description: 'pokemon company' }
		});
	});
	test('It should return newly made invoice', async () => {
		const inv_response = await request(app).post('/invoices').send({
			comp_code: 'testcmp',
			amt: 120,
			paid: false,
			paid_date: null
		});
		expect(inv_response.statusCode).toEqual(201);
		expect(inv_response.body).toEqual({
			invoice: {
				id: expect.any(Number),
				add_date: expect.any(String),
				comp_code: expect.any(String),
				amt: 120,
				paid: false,
				paid_date: null
			}
		});
	});
});

describe('GET routes for specific company or invoice', function() {
	test('It should return 404 if company not found', async () => {
		const cmp_response = await request(app).get('/companies/0');
		expect(cmp_response.statusCode).toEqual(404);
	});
	test('It should return 404 if invoice not found', async () => {
		const inv_response = await request(app).get('/invoices/0');
		expect(inv_response.statusCode).toEqual(404);
	});
});
