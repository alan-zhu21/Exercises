const ExpressError = require('./error');
const express = require('express');
const { processQuery, ConvertToNum, getMean, getMedian, getMode } = require('./helpers');

const app = express();

app.get('/mean', (req, res, next) => {
	let query = req.query;

	try {
		if (query['nums'] === undefined) {
			throw new ExpressError('nums are required', 400);
		}
		let mean = getMean(processQuery(query));
		res.json({
			operation: 'mean',
			value: mean
		});
	} catch (e) {
		next(e);
	}
});

app.get('/median', (req, res, next) => {
	let query = req.query;

	try {
		if (query['nums'] === undefined) {
			throw new ExpressError('nums are required', 400);
		}
		let median = getMedian(processQuery(query));
		res.json({
			operation: 'median',
			value: median
		});
	} catch (e) {
		next(e);
	}
});

app.get('/mode', (req, res, next) => {
	let query = req.query;

	try {
		if (query['nums'] === undefined) {
			throw new ExpressError('nums are required', 400);
		}
		let mode = getMode(processQuery(query));
		res.json({
			operation: 'mode',
			value: mode
		});
	} catch (e) {
		next(e);
	}
});

app.use((err, req, res, next) => {
	return res.json({
		error: err,
		message: err.message
	});
});

app.listen(3000, function() {
	console.log('Server on port 3000');
});
