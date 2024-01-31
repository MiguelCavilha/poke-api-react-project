import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemon } from '../../services/poke-api';
import { Abilities } from './abilities'
import { ThemeContext } from '../../contexts/toggler.js';
import { useContext } from 'react';
import { styled } from 'styled-components';
import { typeColors } from '../../utility/colors.js';
import pokedexUpImage from '../../assets/images/Pokedex-Up.png';
import pokedexDwImage from '../../assets/images/Pokedex-Dw.png';






function PokemonDetails() {



  const [pokemon, setPokemon] = useState();



  const { name } = useParams();



  useEffect(() => {
    getPokemon(name)
      .then(pokemon => setPokemon(pokemon))
  }, [name]);


  const { theme } = useContext(ThemeContext);
  const color = typeColors[pokemon?.types[0].type.name];

  if (!pokemon) return <p>Loading...</p>;

  return (
    <Div style={{ color: theme.color, backgroundColor: theme.background }} >

      <Header style={{ backgroundColor: color }}>
        <Img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}></Img>
        <H1>#{pokemon.id} {pokemon.name}</H1>
        <H2>Type: {pokemon.types.map(type => type.type.name).join(', ')}</H2>
        <H3>Height: {pokemon.height} ft</H3>
        <H3>Weight: {pokemon.weight} lb</H3>
        <H3>Base Experience: {pokemon.base_experience} xp</H3>
      </Header>

      <Section>
        <ImgDw src={pokedexUpImage} alt='Pokedex Up' />
        <H4>Moves</H4>
        {pokemon.moves && pokemon.moves.slice(0, 4).map(move => (
          <P key={move.move.name}>{move.move.name}</P>

        ))}

        <Abilities pokemon={pokemon} />

        <ImgDw src={pokedexDwImage} alt='Pokedex Down' />

      </Section>






    </Div>
  )



}

const ImgDw = styled.img`
            place-items: center;
            width: 100%;
            height: 100%;


`

const Div = styled.div`

         width: 100%;
         display: flex;
         flex-direction: row;
         align-items: center;
         justify-content: center;

         @media (max-width: 930px) {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 470px) {
          grid-template-columns: repeat(1, 1fr);
        }

        @media (max-width: 375px) {
          grid-template-columns: repeat(1, 1fr);
        }

`

const Header = styled.header`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 30%;
          height: 50%;
          padding: 1rem;
          margin: 2rem;
          border-radius: 2rem;   
           
          box-shadow:
         0 1.6px 1.6px rgba(0, 0, 0, 0.023),
         0 3.8px 3.8px rgba(0, 0, 0, 0.034),
         0 6.9px 6.9px rgba(0, 0, 0, 0.041),
         0 11.4px 11.4px rgba(0, 0, 0, 0.049),
         0 18.8px 18.8px rgba(0, 0, 0, 0.056),
         0 32.8px 32.8px rgba(0, 0, 0, 0.067),
         0 71px 71px rgba(0, 0, 0, 0.09);


          @media (max-width: 930px) {
            width: 70%;
            height: 100%;
          }
`

const H1 = styled.h1`
          font-size: 2.5rem;
          text-transform: capitalize;
          font-family: 'Pokemon Hollow', sans-serif;
          letter-spacing: 3px;

`

const H2 = styled.h2`
          font-size: 1.5rem;
          text-transform: capitalize;
          letter-spacing: 2.5px;

`

const H3 = styled.h3`
          font-size: 1rem;
          letter-spacing: 2px;
          margin: 0.3rem;


`

const Img = styled.img`
          width: 45%;
`

const Section = styled.section`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 40%;
          height: 20%;
          padding: 1rem;
          margin: 2rem;
          border-radius: 2rem;
          border: groove;
          box-shadow:
         0 1.6px 1.6px rgba(0, 0, 0, 0.023),
         0 3.8px 3.8px rgba(0, 0, 0, 0.034),
         0 6.9px 6.9px rgba(0, 0, 0, 0.041),
         0 11.4px 11.4px rgba(0, 0, 0, 0.049),
         0 18.8px 18.8px rgba(0, 0, 0, 0.056),
         0 32.8px 32.8px rgba(0, 0, 0, 0.067),
         0 71px 71px rgba(0, 0, 0, 0.09);  

          @media (max-width: 930px) {
            width: 70%;
            height: 100%;
          }

`

const H4 = styled.h4`
          display: flex;
          flex-direction: row;
          justify-content: center;
          text-transform: capitalize;
          font-size: 1.2rem;
          letter-spacing: 2px;    

`


const P = styled.p`

          display: flex;
          flex-direction: row;
          justify-content: center;
          text-transform: capitalize;
          font-size: 1.2rem;
          letter-spacing: 2px;
          line-height: 0.1;


`






export { PokemonDetails }