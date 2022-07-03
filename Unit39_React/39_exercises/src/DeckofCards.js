import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

function DeckofCards() {
	const deckId = useRef();

	const [ cardsDrawn, setCardsDrawn ] = useState([]);
	const [ intervalId, setIntervalId ] = useState(0);
	useEffect(() => {
		async function getDeck() {
			const newDeckUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
			const newDeck = await axios.get(newDeckUrl);
			deckId.current = newDeck.data.deck_id;
		}
		getDeck();
		return stopDraw();
	}, []);

	function toggle(draw) {
		const btn = document.getElementById('btn');
		if (btn.innerText === 'Start Drawing') {
			btn.innerText = 'Stop Drawing';
			startDraw(draw);
		} else {
			btn.innerText = 'Start Drawing';
			stopDraw();
		}
	}

	function startDraw(draw) {
		setIntervalId(
			setInterval(() => {
				draw();
			}, 1000)
		);
	}

	function stopDraw() {
		clearInterval(intervalId);
		axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/`);
	}

	function handleClick() {
		async function draw() {
			const draw_card_url = `http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`;
			const res = await axios.get(draw_card_url);
			setCardsDrawn((cardsDrawn) => [
				...cardsDrawn,
				{
					value: res.data.cards[0].value,
					suit: res.data.cards[0].suit,
					image: res.data.cards[0].image
				}
			]);
			if (res.data.remaining === 0) {
				stopDraw();
				alert('Error: no cards remaining!');
			}
		}
		toggle(draw);
	}

	return (
		<div>
			<button id="btn" onClick={handleClick}>
				Start Drawing
			</button>
			{cardsDrawn.map((card) => <Card name={`${card.value}-${card.suit}`} image={`${card.image}`} />)}
		</div>
	);
}

export default DeckofCards;
