import React from 'react';
import './Pokecard.css';

const Pokecard = ({ id, name, type, exp }) => {
	return (
		<div className="Pokecard">
			<h2 className="Pokecard-name">{name}</h2>
			<img
				className="Pokecard-img"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
			/>
			<p>Type: {type}</p>
			<p>EXP: {exp}</p>
		</div>
	);
};

export default Pokecard;
