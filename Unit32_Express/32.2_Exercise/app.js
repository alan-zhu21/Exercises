const express = require('express');
const itemsRoutes = require('./itemsRoutes');

app = express();

// routes
app.use(express.json());

app.use('/items', itemsRoutes);

app.use((err, req, res, next) => {
	return res.json({
		error: err,
		message: err.message
	});
});

module.exports = app;
