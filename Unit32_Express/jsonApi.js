const express = require('express');

const app = express();

app.use(express.json());

function attemptToDB() {
	throw new Error('Connection Error!', 403);
}

const CANDIES = [ { name: 'snickers', qty: 43, price: 1.5 }, { name: 'skittles', qty: 26, price: 0.99 } ];

app.get('/candies', (req, res) => {
	res.send(CANDIES);
});

app.post('/candies', (req, res) => {
	if (req.body.name.toLowerCase() === 'circus peanuts') {
		res.status(403).json({ msg: 'HORRIBLE CHOICE. CIRUC PEANUTS FORBIDDEN!' });
	}
	CANDIES.push(req.body);
	res.status(201).json(CANDIES);
});

app.get('/book', (req, res, next) => {
	try {
		attemptToDB();
	} catch (e) {
		next(e);
	}
});

app.use((err, req, res, next) => {
	console.log(err);
	res.send(`Oh no, this is an error! ${err}`);
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
