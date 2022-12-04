'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Job {
	/** Can create a job from data, update db, return new job data.
     * 
     * data should be { title, salary, equity, company_handle }
     * 
     * Returns { title, salary, equit, company_handle }
     * 
     * Throws BadRequestError if company already in database.
     */

	static async create({ title, salary, equity, company_handle }) {
		const result = await db.query(
			`
        INSERT INTO jobs 
        (title, salary, equity, company_handle)
        VALUES ($1, $2, $3, $4)
        RETURNING title, salary, equity, company_handle`,
			[ title, salary, equity, company_handle ]
		);
		const job = result.rows[0];

		return job;
	}

	/** Find and return all jobs.
     * 
     * Returns [{ title, salary, equity, company_handle }, ...]
     */

	static async findAll(filters = {}) {
		let query = `SELECT id, title, salary, equity, company_handle FROM jobs`;
		let whereClause = [];
		let values = [];
		const { title, minSalary, hasEquity, company_handle } = filters;
		if (minSalary !== undefined) {
			values.push(minSalary);
			whereClause.push(`salary >= $${values.length}`);
		}
		if (hasEquity) {
			values.push(hasEquity);
			whereClause.push(`equity > 0`);
		}
		if (title) {
			values.push(title);
			whereClause.push(`title ILIKE $${values.length}`);
		}
		if (company_handle) {
			values.push(company_handle);
			whereClause.push(`company_handle = $${values.length}`);
		}
		if (whereClause.length > 0) {
			query += ' WHERE ' + whereClause.join('AND ');
		}
		query += ' ORDER BY title';
		const jobsRes = await db.query(query, values);

		return jobsRes.rows;
	}

	/** Find a specific job.
     * 
     * Returns { title, salary, equity, company_handle }
     */

	static async get(id) {
		const jobRes = await db.query(
			`
        SELECT title, salary, equity, company_handle FROM jobs WHERE id = $1`,
			[ id ]
		);

		const job = jobRes.rows[0];

		if (!job) throw new NotFoundError(`No job id: ${id}`);

		return job;
	}

	/** Update company data with 'data.'
     * 
     * This can handle partial updates which updates only fields provided.
     * 
     * Data can include: {title, salary, equity}
     * 
     * Returns {title, salary, equity, company_handle}
     * 
     * Throws NotFoundError if not found.
     */

	static async update(id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			title: 'title',
			salary: 'salary',
			equity: 'equity',
			company_handle: 'company_handle'
		});
		const handleVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING title, salary, equity, company_handle`;
		const result = await db.query(querySql, [ ...values, id ]);
		const job = result.rows[0];

		if (!job) throw new NotFoundError(`No job id: ${id}`);

		return job;
	}

	/** Delete given job from database and returns undefined.
     * 
     * Throws NotFoundError if company not found.
     */

	static async remove(id) {
		const result = await db.query(
			`
        DELETE FROM jobs WHERE id = $1`,
			[ id ]
		);
		const job = result.rows[0];
		if (!job) throw new NotFoundError(`No job id: ${id}`);
	}
}

module.exports = Job;
