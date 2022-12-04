const express = require('express');
const res = require('express/lib/response');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('HOMEPAGE!');
});

app.get('/dogs', function(request, response) {
	return response.send('Dogs go brk brk');
});

app.get('/dogs', (req, res) => {
	res.send('MEOW MEOW MEOW');
});

app.get('/chickens', (req, res) => {
	res.send('BOCK BOCK BOCK (get request)');
});

app.post('/chickens', function createChicken(req, res) {
	res.send('YOU CREATED A NEW CHICKEN (post request)');
});

const greetings = {
	en: 'hello',
	fr: 'bonjour',
	ic: 'hallo',
	js: 'konnichiwa'
};

app.get('/greet/:language', (req, res) => {
	const lang = req.params.language;
	const greeting = greetings[lang];
	res.send(greeting);
});

app.get('/search', (req, res) => {
	const { term = 'piggies', sort = 'top' } = req.query;
	return res.send(`SEARCH PAGE! Term is ${term}, sort is ${sort}`);
});

app.get('/show-me-headers', (req, res) => {
	res.send(req.headers);
});

app.post('/register', (req, res) => {
	res.send(`Welcome ${req.body.username}`);
});

app.listen(3000, function() {
	console.log('App on port 3000');
});
