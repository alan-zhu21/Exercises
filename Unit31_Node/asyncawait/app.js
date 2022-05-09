// Part 1

// nums_base_url = 'http://numbersapi.com/';

// // 1
// async function getFact(num) {
// 	let fact = await axios.get(`${nums_base_url}${num}`);
// 	console.log(fact.data);
// }

// getFact(8);

// // 2
// async function getFacts(nums) {
// 	let facts = await axios.get(`${nums_base_url}${nums}`);
// 	const facts_html_element = $('#facts-here');
// 	for (const fact in facts.data) {
// 		console.log(facts.data[`${fact}`]);
// 		facts_html_element.append(`<p>${facts.data[fact]}</p>`);
// 	}
// }

// getFacts('8..10');

// // 3
// async function get4Facts(num) {
// 	let p1 = axios.get(`${nums_base_url}${num}`);
// 	let p2 = axios.get(`${nums_base_url}${num}`);
// 	let p3 = axios.get(`${nums_base_url}${num}`);
// 	let p4 = axios.get(`${nums_base_url}${num}`);

// 	let fact1 = await p1;
// 	let fact2 = await p2;
// 	let fact3 = await p3;
// 	let fact4 = await p4;

// 	$('#facts-here').append(`<p>${fact1.data}</p>`);
// 	$('#facts-here').append(`<p>${fact2.data}</p>`);
// 	$('#facts-here').append(`<p>${fact3.data}</p>`);
// 	$('#facts-here').append(`<p>${fact4.data}</p>`);
// }

// get4Facts(7);

// Part 2
// 1
cards_base_url = 'http://deckofcardsapi.com/api/deck/';

async function drawCard() {
	let card = await axios.get(`${cards_base_url}new/draw/?count=1`);
	console.log(`${card.data.cards[0]['value'].toLowerCase()} of ${card.data.cards[0]['suit'].toLowerCase()}`);
}

drawCard();

// 2
async function draw2Cards() {
	let draw1 = await axios.get(`${cards_base_url}new/draw/?count=1`);
	const deckId = draw1.data.deck_id;
	let draw2 = await axios.get(`${cards_base_url}${deckId}/draw/?count=1`);

	console.log(`${draw1.data.cards[0]['value'].toLowerCase()} of ${draw1.data.cards[0]['suit'].toLowerCase()}`);
	console.log(`${draw2.data.cards[0]['value'].toLowerCase()} of ${draw2.data.cards[0]['suit'].toLowerCase()}`);
}

draw2Cards();

// 3
let deckId = null;
let placeCards = $('#cards-here');
const $button = $('#draw-btn');

async function shuffle() {
	let deck = await axios.get(`${cards_base_url}new/shuffle`);
	deckId = deck.data.deck_id;
}

shuffle();

async function drawACard() {
	let res = await axios.get(`${cards_base_url}${deckId}/draw/?count=1`);
	let cardImg = res.data.cards[0]['image'];
	placeCards.append(`<img src="${cardImg}" style="position: absolute;">`);
	if (res.data.remaining === 0) {
		$button.remove();
	}
}

$('button').on('click', drawACard);
