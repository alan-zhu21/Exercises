/** BizTime express application. */

const express = require('express');

const app = express();
const ExpressError = require('./expressError');
const cmpRoutes = require('./routes/companies');
const invRoutes = require('./routes/invoices');

app.use(express.json());

app.use('/companies', cmpRoutes);
app.use('/invoices', invRoutes);

/** 404 handler */

app.use(function(req, res, next) {
	const err = new ExpressError('Not Found', 404);
	return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err,
		message: err.message
	});
});

module.exports = app;
