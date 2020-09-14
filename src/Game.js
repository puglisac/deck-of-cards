import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Game = () => {
	const [ img, setImg ] = useState("");
	const [ deck, setDeck ] = useState("");
	const [ drawing, setDrawing ] = useState(false);
	const [ buttonText, setButtonText ] = useState("Draw Cards");
	useEffect(() => {
		newDeck();
	}, []);

	useEffect(
		() => {
			let id;
			if (drawing) {
				setButtonText("Pause");
				drawCard();
				id = setInterval(() => drawCard(), 1000);
			} else setButtonText("Draw Cards");
			return () => clearInterval(id);
		},
		[ drawing ]
	);

	const newDeck = async () => {
		const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
		setDeck(res.data.deck_id);
	};
	const suffleDeck = async () => {
		await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`);
		setImg("");
		setDrawing(false);
	};

	const drawCard = async () => {
		const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
		try {
			setImg(card.data.cards[0].image);
		} catch (TypeError) {
			setDrawing(false);
			alert("No more cards in deck!");
		}
	};
	return (
		<div>
			<button onClick={() => setDrawing(!drawing)}>{buttonText}</button>
			<button onClick={suffleDeck}>Suffle Deck</button>
			<div>{img ? <Card img={img} /> : null}</div>
		</div>
	);
};
export default Game;
