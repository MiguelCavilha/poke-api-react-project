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
          return { ...details, sprite, types, color: typeColors[types[0]], };

        })
      ))
      .then(data => setPokemons(data));



  }, [pokemons, offset, limit]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  }

  const { theme } = useContext(ThemeContext);



  return (
    <Div style={{ color: theme.color, backgroundColor: theme.background }}>
      <H1>PokéDex</H1>
      <Ol>
        {pokemons.map(({ name, sprite, types, color }) => (
          <Li key={name} style={{ backgroundColor: color }}>
            {Link ? <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/pokemon/${name}`}>
              <Img src={sprite} alt='{name}' />
              <H2>{name}</H2>
              <P>{types[0]} {types[1]}</P>
            </Link> : name}
          </Li>
        ))}
      </Ol>
      <Button onClick={loadMore}>Load More</Button>
    </Div>
  )

}


const Div = styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         background: url(${backgroundImage});
         background-size: 70px;


         @media (max-width: 1024px) {
          flex-direction: column;
          align-items: center;
        }

         @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 470px) {
          flex-direction: column;
          align-items: center;
          background-size: 50px
        }

        @media (max-width: 375px) {
          flex-direction: column;
          align-items: center;
          background-size:40px
        }
         

`




const H1 = styled.h1`
         margin-left: 3rem;
         text-align: center;
         text-shadow: 2px 2px #1f57b5;
         font-size: 5rem;
         color: #ffd203;
        -webkit-text-stroke-width: 3px; 
        -webkit-text-stroke-color: #1f57b5; 
        font-family: 'Pokemon Solid', sans-serif;
        letter-spacing: 5px;


        @media (max-width: 768px) {
          font-size: 5rem;
        }
        @media (max-width: 470px) {
          margin-right: 3rem;
          font-size: 4rem;
        }

        @media (max-width: 375px) {
          margin-right: 3rem;
          font-size: 3rem;
        }

`


const H2 = styled.h2`

         font-size: 1.2rem;
         text-transform: capitalize;
         margin-bottom: 0.2rem;
         font-family: 'Pokemon Solid', sans-serif;
         letter-spacing: 3px;

         @media (max-width: 470px) {
          font-size: 0.8rem
        }

        @media (max-width: 375px) {
          font-size: 0.8rem
        }


`




const Ol = styled.ol`
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         grid-gap: 100px;


         @media (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }
         @media (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 470px) {
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 50px;
          margin-left: 3rem;
        }

        @media (max-width: 375px) {
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 30px;
          margin-left: 3rem;
        }
       
                  
`

const Li = styled.li`
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         padding: 1.5rem 0;
         margin-right: 2rem;

    

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


         @media (max-width: 470px) {
          margin-right: 5rem;
          min-width: 180px;
          height: 225px;
          text-align: center;
        }

        @media (max-width: 375px) {
          min-width: 180px;
          height: 225px;
          text-align: center;
        }

`

const Img = styled.img`

         width: 80px;
         margin-top: 3rem;
         position: relative
         
         @media (max-width: 460px) {
          width: 60px;
        }

        @media (max-width: 375px) {
          width: 60px;
        }

`
const P = styled.p`
        
        text-transform: capitalize;
        font-family: 'Pokemon Solid', sans-serif;
        letter-spacing: 3px;


        @media (max-width: 460px) {
          font-size: 0.8rem
        }

        @media (max-width: 375px) {
          font-size: 0.8rem
        }
                

`

const Button = styled.button`
        width: 90px;
        height: 90px;
        display:inline-block;
        margin:20px;
        position: relative;
        color: #fff;
        border: 6px solid #ccc;
        border-radius: 50%;
        background-image: -moz-radial-gradient(40% 40%,circle,rgba(0,0,0,.1) 40%,rgba(0,0,0,1) 100%), -moz-linear-gradient(-90deg, #f33 45%, #333 45%, #3f3f3f 50%, #333 55%, #FFF 55%);
        background-image: -webkit-radial-gradient(40% 40%,circle,rgba(0,0,0,.1) 40%,rgba(0,0,0,1) 100%),-webkit-linear-gradient(-90deg, #f33 45%, #333 35%, #3f3f3f 60%, #333 55%, #FFF 55%);
        cursor: pointer;

        @media (max-width: 460px) {
         width: 50px;
         height: 50px;

        @media (max-width: 375px) {
        width: 50px;
        height: 50px;
  
 `


export { PokemonList }