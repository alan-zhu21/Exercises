const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');
const router = new express.Router();
const slugify = require('slugify');

// router.use(express.json());

// Get all companies route
router.get('/', async (req, res, next) => {
	try {
		let results = await db.query(`SELECT code, name, description FROM companies`);
		return res.json({ companies: results.rows });
	} catch (err) {
		next(err);
	}
});

// Get a single company route
router.get('/:code', async (req, res, next) => {
	let { code } = req.params;
	try {
		let results = await db.query(
			`SELECT c.code, c.name, c.description, i.industry FROM companies AS c LEFT JOIN industries AS i ON i.company_id=c.code WHERE c.code = $1`,
			[ code ]
		);
		if (results.rows.length === 0) {
			throw new ExpressError(`Cannot find company`, 404);
		}
		const { code1, name, description } = results.rows[0];
		const industries = results.rows.map((r) => r.industry);
		return res.json({ code1, name, description, industries });
	} catch (err) {
		next(err);
	}
});

// Post a new company
router.post('/', async (req, res, next) => {
	let { name, description } = req.body;
	let code = slugify(name, { lower: true });
	try {
		let results = await db.query(
			`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`,
			[ code, name, description ]
		);
		return res.status(201).json({ company: results.rows[0] });
	} catch (err) {
		next(err);
	}
});

// Update a company
router.put('/:code', async (req, res, next) => {
	let { code } = req.params;
	let { name, description } = req.body;
	let new_code = slugify(name, { lower: true });
	try {
		let results = await db.query(
			`UPDATE companies SET code=$1, name=$2, description=$3 WHERE code = $4 RETURNING code, name, description`,
			[ new_code, name, description, code ]
		);
		if (results.rowCount.length === 0) {
			throw new ExpressError(`Could not find company: ${code}`, 404);
		}
		return res.json({ company: results.rows[0] });
	} catch (err) {
		next(err);
	}
});

router.delete('/:code', async (req, res, next) => {
	let { code } = req.params;
	try {
		let results = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code, name, description`, [
			code
		]);
		if (results.rowCount.length === 0) {
			throw new ExpressError(`Could not find company: ${code}`, 404);
		}
		return res.json({ deleted: results.rows[0] });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
