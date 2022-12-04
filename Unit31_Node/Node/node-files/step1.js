const fs = require('fs');
const process = require('process');
let path = process.argv[2];

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
			process.exit(err);
		}
		console.log(data);
	});
}

cat(path);
