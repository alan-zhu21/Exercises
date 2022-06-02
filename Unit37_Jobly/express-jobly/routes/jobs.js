const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const Job = require('../models/jobs');
const jobNewSchema = require('../schemas/jobNew.json');
const jobUpdateSchema = require('../schemas/jobUpdate.json');
const res = require('express/lib/response');
const req = require('express/lib/request');

const router = new express.Router();

// GET route for all jobs
// Authorization Required: login

router.get('/', ensureLoggedIn, async function(req, res, next) {
	const q = req.body;
	if (q.minSalary !== undefined) q.minSalary = +q.minSalary;

	try {
		const validator = jsonschema.validate(q, jobNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const jobs = await Job.findAll(q);
		return res.json({ jobs });
	} catch (err) {
		return next(err);
	}
});

// POST new job
// Authorization Required: Admin

router.post('/', ensureAdmin, async function() {
	try {
		const validator = jsonschema.validate(req.body, jobNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const job = await Job.create(req.body);
		return res.status(201).json({ job });
	} catch (err) {
		return next(err);
	}
});

// GET a specific job by id
// Authorization Required: None

router.get('/:id', async function() {
	try {
		const job = await Job.get(req.params.id);
		return res.json({ job });
	} catch (err) {
		return next(err);
	}
});

// PATCH route to update a job. Can change title, salary, and equity
// /[id] {data} which can include { title, salary, equity } => { job }
// Authorization Required: Admin

router.patch('/:id', ensureAdmin, async function() {
	try {
		const validator = jsonschame.validate(req.body, jobUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		let data = req.body;
		const job = await Job.update(req.params.id, data);
		return res.json({ job });
	} catch (err) {
		return next(err);
	}
});

// DELETE /[id] => { delete: id }
// Authorization Required: Admin

router.delete('/:id', ensureAdmin, async function() {
	try {
		await Job.remove(req.params.id);
		return res.json({ deleted: req.params.id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
