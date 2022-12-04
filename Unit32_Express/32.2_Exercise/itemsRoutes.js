const express = require('express');
const router = new express.Router();
const items = require('./fakeDB');
const ExpressError = require('./expressError');

router.get('/', (req, res, next) => {
	return res.json(items);
});

router.post('/', (req, res, next) => {
	let item = {
		name: req.body.name,
		price: req.body.price
	};
	items.push(item);
	return res.status(201).json({
		added: item
	});
});

router.get('/:name', (req, res, next) => {
	try {
		const foundItem = items.find((item) => item.name === req.params.name);
		if (foundItem === undefined) {
			throw new ExpressError('Item not found', 404);
		}
		return res.json(foundItem);
	} catch (e) {
		next(e);
	}
});

router.patch('/:name', (req, res, next) => {
	try {
		const foundItem = items.find((item) => item.name === req.params.name);
		if (foundItem === undefined) {
			throw new ExpressError('Item not found', 404);
		}
		foundItem.name = req.body.name;
		foundItem.price = req.body.price;
		return res.json({
			updated: foundItem
		});
	} catch (e) {
		next(e);
	}
});

router.delete('/:name', (req, res, next) => {
	try {
		const foundItemIdx = items.findIndex((item) => item.name === req.params.name);
		if (foundItemIdx === -1) {
			throw new ExpressError('Item not found', 404);
		}
		items.splice(foundItemIdx, 1);
		res.json({
			message: 'Deleted'
		});
	} catch (e) {
		next(e);
	}
});

module.exports = router;
