import { Link } from 'react-router-dom';
import { getPokemon, getPokemonList, getPokemonSprite } from '../../services/poke-api.js';
import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../contexts/toggler.js';
import styled from 'styled-components';
import { typeColors } from '../../utility/colors.js';
import backgroundImage from '../../assets/images/pokeball.png';


function PokemonList() {


  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(12);
  const [limit] = useState(12);



  useEffect(() => {
    getPokemonList(offset, limit)
      .then(results => Promise.all(
        results.map(async pokemon => {
          const details = await getPokemon(pokemon.name);
          const sprite = await getPokemonSprite(pokemon.name);
          const types = details.types.map(type => type.type.name);
          return{...details, sprite, types, color:typeColors[types[0 && 1]],};
          
        })
      ))
      .then(data => setPokemons(data));



  }, [pokemons, offset, limit]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  }

  const { theme } = useContext(ThemeContext);



  return (
    <Div style={{ color: theme.color, backgroundColor: theme.background  }}>
      <H1>Pokedex</H1>
      <Ol>
        {pokemons.map(({ name, sprite, types, color }) => (
          <Li key={name} style={{backgroundColor: color, background: `linear-gradient(to-bottom)`}}>
            {Link ? <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/pokemon/${name}`}>
              <Img src={sprite} alt='{name}' />
              <H2>{name}</H2>
              <P>{types[0]} {types[1]}</P>
            </Link> : name}
          </Li>
        ))}
      </Ol>
      <button onClick={loadMore}>Load More</button>
    </Div>
  )

}


const Div = styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         padding: 5rem;
         background: url(${backgroundImage});
         background-size: 70px;
         

`




const H1 = styled.h1`
         margin-left: 3rem;
         text-align: center;
         text-shadow: 2px 2px #1f57b5;
         font-size: 3rem;
         color: #ffd203;
        -webkit-text-stroke-width: 3px; 
        -webkit-text-stroke-color: #1f57b5; 

`


const H2 = styled.h2`

         font-size: 1.2rem;
         text-transform: capitalize;
         margin-bottom: 0.2rem;


`




const Ol = styled.ol`
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         grid-gap: 100px;
         list-style-type: none;
                  
`

const Li = styled.li`
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         padding: 1.5rem 0;
         margin: 2rem;

    

         border-radius: 1rem;
         min-width: 220px;
         height: 285px;
         text-align: center;


         box-shadow:
         0 1.6px 1.6px rgba(0, 0, 0, 0.023),
         0 3.8px 3.8px rgba(0, 0, 0, 0.034),
         0 6.9px 6.9px rgba(0, 0, 0, 0.041),
         0 11.4px 11.4px rgba(0, 0, 0, 0.049),
         0 18.8px 18.8px rgba(0, 0, 0, 0.056),
         0 32.8px 32.8px rgba(0, 0, 0, 0.067),
         0 71px 71px rgba(0, 0, 0, 0.09);

`

const Img = styled.img`

         width: 100px;
         margin-top: 4rem;
         position: relative

`
const P = styled.p`
        
        text-transform: capitalize;

`


export { PokemonList }