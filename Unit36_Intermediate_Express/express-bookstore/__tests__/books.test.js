const request = require('supertest');

process.env.NODE_ENV = 'test';
const app = require('../app');
const db = require('../db');
jest.useRealTimers();

let book_isbn;

beforeEach(async function() {
	let results = await db.query(
		`INSERT INTO books VALUES('1233313', 'http://a.co/eobPtX2', 'Dave Franko', 'english', 85, 'Wellington of Beef', 'Where the eagles fly', 2018) RETURNING isbn`
	);

	book_isbn = results.rows[0].isbn;
});

afterEach(async function() {
	await db.query('DELETE FROM books');
});

describe('get /books route', () => {
	test('gets all the listed books', async function() {
		const response = await request(app).get('/books');
		const books = response.body.books;
		expect(books).toHaveProperty('isbn');
		expect(books).toHaveProperty('author');
		expect(books).toHaveLength(1);
	});
});

describe('get /books/:isbn route', () => {
	test('gets specific book', async () => {
		const response = await request(app).get('/books/1233313');
		const book = response.body.book;
		expect(book).toHaveProperty('isbn');
		expect(book.isbn).toEqual(book_isbn);
	});
});

describe('post /books route', () => {
	it('creates a book', async () => {
		let results = await request(app).post('/books').send({
			isbn: '1230094',
			amazon_url: 'http://a.co/eobPtX2',
			author: 'Joub Bluth',
			language: 'english',
			pages: 4,
			publisher: 'Wellington of Beef',
			title: 'The Magicians Handbook',
			year: 2000
		});
		expect(results.body.book).toHaveProperty('isbn');
		expect(results.statusCode).toBe(201);
	});

	it('Prevents creating book without required title', async function() {
		const response = await request(app).post(`/books`).send({ year: 2000 });
		expect(response.statusCode).toBe(400);
	});
});

describe('put /books/:id', () => {
	it('updates a book', async () => {
		let response = await request(app).put(`/books/${book_isbn}`).send({
			amazon_url: 'http://a.co/eobPtX2',
			author: 'Joub Bluth',
			language: 'english',
			pages: 4,
			publisher: 'Wellington of Beef',
			title: 'The Magicians Handbook',
			year: 2000
		});
		expect(response.statusCode).toEqual(200);
		expect(response.body.book).toHaveProperty(author);
		expect(response.body.book.author).toEqual('Joub Bluth');
	});
});

describe('delete /books/:id', () => {
	it('deletes a book', async () => {
		let err_response = await request(app).delete('/books/0');
		let response = await request(app).delete(`/books/${book_isbn}`);
		expect(response.body).toEqual({ message: 'Book deleted' });
		expect(err_response).toThrow();
	});
});

afterAll(async function() {
	await db.end();
});
