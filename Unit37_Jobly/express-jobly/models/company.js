'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for companies. */

class Company {
	/** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

	static async create({ handle, name, description, numEmployees, logoUrl }) {
		const duplicateCheck = await db.query(
			`SELECT handle
           FROM companies
           WHERE handle = $1`,
			[ handle ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate company: ${handle}`);

		const result = await db.query(
			`INSERT INTO companies
           (handle, name, description, num_employees, logo_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
			[ handle, name, description, numEmployees, logoUrl ]
		);
		const company = result.rows[0];

		return company;
	}

	/** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

	static async findAll(filters = {}) {
		let query = `SELECT handle,
      name,
      description,
      num_employees AS "numEmployees",
      logo_url AS "logoUrl"
      FROM companies`;
		let whereClause = []; //will be an array of the column names joined at the end
		let values = []; //will contain array of values for use in parametrized sql query
		const { minEmployees, maxEmployees, name } = filters;
		if (minEmployees > maxEmployees) {
			throw new BadRequestError('Minimum number of employees cannot be higher than the maximum');
		}
		if (minEmployees !== undefined) {
			values.push(minEmployees);
			whereClause.push(`num_employees >= $${values.length}`);
		}
		if (maxEmployees !== undefined) {
			values.push(maxEmployees);
			whereClause.push(`num_employees <= $${values.length}`);
		}
		if (name) {
			values.push(`%${name}%`);
			whereClause.push(`name ILIKE $${values.length}`);
		}
		if (whereClause.length > 0) {
			query += ' WHERE ' + whereClause.join('AND ');
		}
		query += ' ORDER BY name';
		const companiesRes = await db.query(query, values);

		return companiesRes.rows;
	}

	/** Find all companies with filtering
   * 
   *  Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *  where name, minEmployees, maxEmployees are filter values that exist
   **/

	// static async findAllWithFilter(name, minEmployees = 0, maxEmployees) {
	// 	const companiesRes = await db.query(
	// 		`SELECT handle, name, description, num_employees AS "numEmployees, log_url AS "logoUrl FROM companies WHERE handle LIKE '%$1%' AND (num_employees >= $2 AND num_employees <= $3) ORDER BY name`,
	// 		[ name, minEmployees, maxEmployees ]
	// 	);
	// 	return companiesRes.rows;
	// }

	/** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

	static async get(handle) {
		const companyRes = await db.query(
			`SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`,
			[ handle ]
		);

		const company = companyRes.rows[0];

		if (!company) throw new NotFoundError(`No company: ${handle}`);

		return company;
	}

	/** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

	static async update(handle, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			numEmployees: 'num_employees',
			logoUrl: 'logo_url'
		});
		const handleVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
		const result = await db.query(querySql, [ ...values, handle ]);
		const company = result.rows[0];

		if (!company) throw new NotFoundError(`No company: ${handle}`);

		return company;
	}

	/** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

	static async remove(handle) {
		const result = await db.query(
			`DELETE
           FROM companies
           WHERE handle = $1
           RETURNING handle`,
			[ handle ]
		);
		const company = result.rows[0];

		if (!company) throw new NotFoundError(`No company: ${handle}`);
	}
}

module.exports = Company;
