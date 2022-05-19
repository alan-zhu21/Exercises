const app = require('../app');
const db = require('../db');
const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const slugify = require('slugify');

// Get all invoices route
router.get('/', async (req, res, next) => {
	let results = await db.query(`SELECT id, comp_code, amt, paid, add_date, paid_date FROM invoices`);
	return res.json({ invoices: results.rows });
});

// Get a specific invoice by id
router.get('/:id', async (req, res, next) => {
	try {
		let id = req.params.id;
		let results = await db.query(
			`SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description FROM invoices AS i JOIN companies AS c ON c.code=i.comp_code WHERE i.id = ${id}`
		);
		if (results.rows.length === 0) {
			throw new ExpressError(`Cannot find invoice: ${err}`, 404);
		}
		let data = results.rows[0];
		let invoice = {
			id: data.id,
			amt: data.amt,
			paid: data.paid,
			add_date: data.add_date,
			paid_date: data.paid_date,
			company: {
				code: data.code,
				name: data.name,
				description: data.description
			}
		};
		return res.json({ invoice });
	} catch (e) {
		next(e);
	}
});

// Post a new company
router.post('/', async function(req, res, next) {
	try {
		let { comp_code, amt } = req.body;

		const result = await db.query(
			`INSERT INTO invoices (comp_code, amt) 
             VALUES ($1, $2) 
             RETURNING id, comp_code, amt, paid, add_date, paid_date`,
			[ comp_code, amt ]
		);

		return res.json({ invoice: result.rows[0] });
	} catch (err) {
		return next(err);
	}
});

// Update an invoice
router.put('/:id', async function(req, res, next) {
	try {
		let { amt, paid } = req.body;
		let id = req.params.id;
		let paidDate = null;

		const currResult = await db.query(
			`SELECT paid
            FROM invoices
            WHERE id = $1`,
			[ id ]
		);

		if (currResult.rows.length === 0) {
			throw new ExpressError(`No such invoice: ${id}`, 404);
		}

		const currPaidDate = currResult.rows[0].paid_date;

		if (!currPaidDate && paid) {
			paidDate = new Date();
		} else if (!paid) {
			paidDate = null;
		} else {
			paidDate = currPaidDate;
		}

		const result = await db.query(
			`UPDATE invoices
            SET amt=$1, paid=$2, paid_date=$3
            WHERE id=$4
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
			[ amt, paid, paidDate, id ]
		);

		return res.json({ invoice: result.rows[0] });
	} catch (err) {
		return next(err);
	}
});

// Delete an invoice
router.delete('/:id', async function(req, res, next) {
	try {
		let id = req.params.id;

		const result = await db.query(
			`DELETE FROM invoices
             WHERE id = $1
             RETURNING id`,
			[ id ]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`No such invoice: ${id}`, 404);
		}

		return res.json({ status: 'deleted' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
