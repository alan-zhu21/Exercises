/** Command-line tool to generate Markov text. */

let fs = require('fs');
let axios = require('axios');
let process = require('process');
let mm = require('./markov.js');

let source = process.argv[2];
let path = process.argv[3];

function generateText(text) {
	let markov = new mm.MarkovMachine(text);
	console.log(markov.makeText());
}

function makeText(path) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.error(`Cannot read file: ${path}: ${err}`);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

async function makeURLText(url) {
	let res;
	try {
		res = await axios.get(url);
	} catch (err) {
		console.error(`Cannot read URL: ${url}: ${err}`);
		process.exit(1);
	}
	generateText(res.data);
}

if (source === 'file') {
	makeText(path);
} else if (source === 'url') {
	makeURLText(path);
} else {
	console.error(`Unknown method: ${method}`);
	process.exit(1);
}
