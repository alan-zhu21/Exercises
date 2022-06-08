import React from 'react';
import defaultPokemon from './defaultPokemon';
import Pokecard from './Pokecard';
import './Pokedex.css';

const Pokedex = ({ props = defaultPokemon }) => {
	return <>
        <h1 className="Pokedex">Pokedex</h1>
        {props.map((p) => <Pokecard id={p.id} name={p.name} type={p.type} exp={p.base_experience} />)}
        </>;
};

export default Pokedex;
