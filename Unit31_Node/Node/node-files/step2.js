const fs = require('fs');
const process = require('process');
let path = process.argv[2];

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
			process.exit(1);
		}
		console.log(data);
	});
}

const axios = require('axios');

async function webCat(path) {
	let res = await axios.get(path);
	try {
		console.log(res.data);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

if (path.includes('http')) {
	webCat(path);
} else {
	cat(path);
}
