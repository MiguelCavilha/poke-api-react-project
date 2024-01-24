import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../../services/poke-api';
import { Abilities } from './abilities'
import { ThemeContext } from '../../contexts/toggler.js';
import { useContext } from 'react';



function PokemonDetails() {



  const [pokemon, setPokemon] = useState();



  const { name } = useParams();



  useEffect(() => {
    getPokemonDetails(name)
      .then(pokemon => setPokemon(pokemon))
  }, [name]);


  const { theme } = useContext(ThemeContext);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{color: theme.color, backgroundColor: theme.background}} >
      <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}></img>
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>


      <h3>Moves</h3>
      {pokemon.moves && pokemon.moves.slice(0, 4).map(move => (
        <p key={move.move.name}>{move.move.name}</p>
      ))}

      <Abilities pokemon={pokemon} />






    </div>
  )



}



export { PokemonDetails }