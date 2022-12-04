function choice(items) {
	const idx = Math.floor(Math.random() * (items.length - 1));
	return items[idx];
}

function remove(items, item) {
	const idx = items.indexOf(item);
	const result = items[idx];
	items.splice(idx, 1);

	return result;
}

export { choice, remove };
