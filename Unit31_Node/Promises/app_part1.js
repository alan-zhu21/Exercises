// Part 1
base_url = 'http://numbersapi.com/';

const html_facts = $('#facts_here');

// 2
axios
	.get(`${base_url}6..9`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		const data = Object.values(res.data);
		data.forEach((fact) => html_facts.append(`<p>${fact}</p>`));
	});

// 3
const res = Promise.all(
	Array.from({ length: 4 }, () => {
		return $.getJSON(`${base_url}8?json`);
	})
).then((res) => {
	res.forEach((fact) => html_facts.append(`<p>${fact.text}</p>`));
});
