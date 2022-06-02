'use strict';

const request = require('supertest');

const db = require('../db.js');
const app = require('../app');
const User = require('../models/user');

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, adminToken } = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe('POST /jobs', function() {
	test('works for jobs', async function() {
		const resp = await request(app)
			.post('/jobs')
			.send({
				title: 'testjob',
				salary: 40000,
				equity: 0,
				company_handle: 'test123'
			})
			.set('authorization', `Bearer ${adminToken}`);
	});
	expect(resp.statusCode).toEqual(201);
	expect(resp.body).toEqual({
		title: 'testjob',
		salary: 40000,
		equity: 0,
		company_handle: 'test123'
	});
});

/************************************** GET /jobs */

describe('GET /jobs', function() {
	test('works', async function() {
		const resp = await request(app).get('/jobs').set('authorization', `Bearer ${adminToken}`);
		expect(resp.body.statusCode).toBe(201);
	});
});

/************************************** GET /jobs/:id */

describe('GET /jobs/:id', function() {
	test('works', async function() {
		const resp = await request(app).get(`/jobs/1`).set('authorization', `Bearer ${adminToken}`);
		expect(resp.body).toEqual({
			title: 'testjob',
			salary: 40000,
			equity: 0,
			company_handle: 'test123'
		});
	});
});

/************************************** PATCH /jobs/:id */

describe('PATCH /jobs/:id', () => {
	test('works', async function() {
		const resp = await request(app)
			.patch(`/jobs/1`)
			.send({
				title: 'New'
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.body).toEqual({
			title: 'New',
			salary: 40000,
			equity: 0,
			company_handle: 'test123'
		});
	});
});

/************************************** DELETE /jobs/:id */

describe('DELETE /jobs/:id', function() {
	test('works', async function() {
		const resp = await request(app).delete(`/jobs/1`).set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({ deleted: 1 });
	});
});
