const fs = require('fs');
const process = require('process');
const axios = require('axios');
let path = process.argv[process.argv.length - 1];
let newPath = null;
if (process.argv[2] === '--out') {
	newPath = process.argv[3];
}

function writeToFile(data, filePath = '.') {
	fs.writeFile(filePath, data, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
			process.exit(1);
		}
		console.log('File Written!');
	});
}

function cat(path, newPath) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
			process.exit(1);
		}
		if (newPath === null) {
			console.log(data);
		} else {
			writeToFile(data, newPath);
		}
	});
}

async function webCat(path, newPath) {
	let res = await axios.get(path);
	try {
		if (newPath === null) {
			console.log(res.data);
		} else {
			writeToFile(res.data, newPath);
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

if (path.includes('http')) {
	try {
		webCat(path, newPath);
	} catch (err) {
		console.log(`Couldn't write to ${new_path}: ${err}`);
		process.exit(1);
	}
} else {
	try {
		cat(path, newPath);
	} catch (err) {
		console.log(`Couldn't write to ${new_path}: ${err}`);
		process.exit(1);
	}
}
