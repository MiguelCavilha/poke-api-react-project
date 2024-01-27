import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../../services/poke-api';
import { Abilities } from './abilities'
import { ThemeContext } from '../../contexts/toggler.js';
import { useContext } from 'react';
import { styled } from 'styled-components';
import { typeColors } from '../../utility/colors.js';



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
    <Div style={{ color: theme.color, backgroundColor: theme.background }} >
      <Header>
        <Img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}></Img>
        <h1>#{pokemon.id}</h1>
        <h2>{pokemon.name}</h2>
        <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      </Header>

      <section>
        <h3>Moves</h3>
        {pokemon.moves && pokemon.moves.slice(0, 4).map(move => (
          <p key={move.move.name}>{move.move.name}</p>
        
      ))}

      <Abilities pokemon={pokemon} />

      </section>






    </Div>
  )



}

const Div = styled.div`

         width: 100%;
         display: flex;
         flex-direction: row;

`

const Header = styled.header`
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-left: 40px;   

`


const Img = styled.img`
          width: 120px;
          height: 147px;
          padding: 1rem 1rem;
          margin: 0.3rem;
          border-radius: 1.2rem;
`





export { PokemonDetails }