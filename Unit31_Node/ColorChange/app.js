// const h1 = document.querySelector('h1');

// function changeColor(el, color) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			el.style.color = color;
// 			resolve();
// 		}, 1000);
// 	});
// }

// // changeColor(h1, 'red')
// // 	.then(() => changeColor(h1, 'orange'))
// // 	.then(() => changeColor(h1, 'yellow'))
// // 	.then(() => changeColor(h1, 'green'))
// // 	.then(() => changeColor(h1, 'blue'))
// // 	.then(() => changeColor(h1, 'indigo'))
// // 	.then(() => changeColor(h1, 'violet'));

// async function rainbow(el) {
// 	await changeColor(el, 'red');
// 	await changeColor(el, 'orange');
// 	await changeColor(el, 'yellow');
// 	await changeColor(el, 'green');
// 	await changeColor(el, 'blue');
// 	await changeColor(el, 'indigo');
// 	await changeColor(el, 'violet');
// }

// rainbow(h1);

// const deck = {
// 	async init() {
// 		let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/`);
// 		this.deckId = res.data.deck_id;
// 	},
// 	async shuffle() {
// 		let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`);
// 		console.log(res);
// 	},
// 	async drawCard() {
// 		let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
// 		console.log(res.data);
// 	}
// };

// class Pokemon {
// 	constructor(id) {
// 		this.id = id;
// 		this.types = [];
// 	}
// 	async getInfo() {
// 		let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
// 		this.name = res.data.name;
// 		for (let type of res.data.types) {
// 			this.types.push(type.type.name);
// 		}
// 	}
// }

// async function getStarWarsFilms() {
// 	const res = await axios.get('http://swapi.co/api/films');
// 	console.log(res);
// }

// getStarWarsFilms();
