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

// Part 2
// 1
const base_url1 = 'http://deckofcardsapi.com/api/deck/';

axios.get(`${base_url1}new/draw/?count=1`).then((res) => {
	const deck_id = res.data.deck_id;
	let first_card = res.data.cards[0];
	let value = first_card.value.toLowerCase();
	let suit = first_card.suit.toLowerCase();
	console.log(`${value} of ${suit}`);
});

// 2
let first_card;
axios
	.get(`${base_url1}new/draw/?count=1`)
	.then((res) => {
		const deck_id = res.data.deck_id;
		first_card = res.data.cards[0];
		return axios.get(`${base_url1}${deck_id}/draw/?count=1`);
	})
	.then((res) => {
		let second_card = res.data.cards[0];
		console.log(`${first_card.value.toLowerCase()} of ${first_card.suit.toLowerCase()}`);
		console.log(`${second_card.value.toLowerCase()} of ${second_card.suit.toLowerCase()}`);
	});

// 3
