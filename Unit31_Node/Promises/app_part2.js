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
let $button = $('#draw_btn');
let $cards = $('#cards_here');
let deckId = null;

axios.get(`${base_url1}new/shuffle`).then((res) => {
	deckId = res.data.deck_id;
});

$button.on('click', function() {
	axios.get(`${base_url1}${deckId}/draw/?count=1`).then((res) => {
		let cardImage = res.data.cards[0].image;
		let angle = Math.random() * 90 - 45;
		let randomX = Math.random() * 40 - 20;
		let randomY = Math.random() * 40 - 20;
		$cards.append(
			$('<img>', {
				src: cardImage,
				css: {
					transform: `translateX(${randomX}px) translateY(${randomY}px) rotate(${angle}deg)`
				}
			})
		);
		if (res.data.remaining === 0) $button.remove();
	});
});
