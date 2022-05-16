process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDB');

let pickles = { name: 'pickles', price: 2.0 };

beforeEach(function() {
	items.push(pickles);
});

afterEach(function() {
	items.length = 0;
});

describe('test get routes', () => {
	test('/items should get all items', async () => {
		const res = await request(app).get('/items');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([ pickles ]);
	});

	test('/items/specific_item should get that specific item by name', async () => {
		const res = await request(app).get('/items/pickles');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(pickles);
	});
});

describe('test post routes', () => {
	test('test status and new added object', async () => {
		const res = await request(app).post('/items').send({
			name: 'firewood',
			price: 8.5
		});
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({
			added: {
				name: 'firewood',
				price: 8.5
			}
		});
	});
});

describe('test patch and delete routes', () => {
	test('test patch working and error catching', async () => {
		const res = await request(app).patch('/items/pickles').send({
			name: 'brandnamepickles',
			price: 5.0
		});
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({
			updated: {
				name: 'brandnamepickles',
				price: 5.0
			}
		});
		expect(() =>
			request(app)
				.patch('/items/pickles123')
				.send({
					name: 'better pickles',
					price: 5.0
				})
				.toThrow()
		);
	});
	test('test delete route', async () => {
		const res1 = await request(app).delete('/items/brandnamepickles');
		expect(res1.statusCode).toBe(200);
		expect(res1.body).toEqual({
			message: 'Deleted'
		});
		expect(() => request(app).delete('/items/brandnamepickles').toThrow());
	});
});
