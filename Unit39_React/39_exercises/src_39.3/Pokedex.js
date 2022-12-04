import React from 'react';
import defaultPokemon from './defaultPokemon';
import Pokecard from './Pokecard';
import './Pokedex.css';
import Clicker from './Clicker'

const Pokedex = ({ props = defaultPokemon }) => {
	return <>
                <Clicker />
                <h1 className="Pokedex">Pokedex</h1>
                {props.map((p) => <Pokecard id={p.id} name={p.name} type={p.type} exp={p.base_experience} />)}
        </>;
};

export default Pokedex;
