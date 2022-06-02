'use strict';

const { NotFoundError, BadRequestError, UnauthorizedError } = require('../expressError');
const db = require('../db.js');
const Job = require('./job.js');
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require('./_testCommon');
const { remove } = require('./user.js');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// findall

describe('findAll', function() {
	test('works', async function() {
		const jobs = await Jobs.findAll();
		expect(jobs).toEqual([
			{
				title: 'test_title',
				salary: 50000,
				equity: 0,
				company_handle: 'test_company'
			}
		]);
	});
});

// get

describe('get', function() {
	test('works', async function() {
		let job = await Job.get('1');
		expect(job).toEqual({
			title: 'test_title',
			salary: 50000,
			equity: 0,
			company_handle: 'test_company'
		});
	});
});

// update

describe('update', function() {
	const updateData = {
		title: 'test2',
		salary: 50001,
		equity: 0,
		company_handle: 'test_company2'
	};
	test('works', async function() {
		let job = await Job.update('1', updateData);
		expect(job).toEqual({
			title: 'test2',
			salary: 50001,
			equity: 0,
			company_handle: 'test_company2'
		});
	});
});

// remove

describe('remove', function() {
	test('works', async function() {
		await Job.remove('1');
		const res = await db.query(`SELECT * FROM jobs WHERE id=1`);
		expect(res.rows.length).toEqual(0);
	});
});
