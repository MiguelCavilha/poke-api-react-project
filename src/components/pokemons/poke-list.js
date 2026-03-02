import { Link } from 'react-router-dom';
import { getPokemon, getPokemonList, getPokemonSprite } from '../../services/poke-api.js';
import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../contexts/toggler.js';
import styled, { keyframes } from 'styled-components';
import { typeColors } from '../../utility/colors.js';
import backgroundImage from '../../assets/images/pokeball.png';


function PokemonList() {


  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(12);
  const [limit] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);



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

  useEffect(() => {
    const filtered = pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    );
    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  }

  const { theme } = useContext(ThemeContext);



  return (
    <Div style={{ color: theme.color, backgroundColor: theme.background }}>
      <H1>PokéDex</H1>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Buscar por nome ou número..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <Ol>
        {filteredPokemons.map(({ name, sprite, types, color, id }) => (
          <Li key={name} style={{ backgroundColor: color }}>
            {Link ? <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/pokemon/${name}`}>
              <PokemonNumber>#{id}</PokemonNumber>
              <Img src={sprite} alt='{name}' />
              <H2>{name}</H2>
              <TypeContainer>
                {types.map((type, index) => (
                  <TypeBadge key={index}>{type}</TypeBadge>
                ))}
              </TypeContainer>
            </Link> : name}
          </Li>
        ))}
      </Ol>
      <Button onClick={loadMore}>Load More</Button>
    </Div>
  )

}


const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Div = styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #43e97b);
         background-size: 400% 400%;
         animation: ${gradientShift} 15s ease infinite;
         background-attachment: fixed;
         min-height: 100vh;
         padding: 2rem 0;
         position: relative;
         overflow: hidden;

         &::before {
           content: '';
           position: absolute;
           width: 100%;
           height: 100%;
           background: url(${backgroundImage});
           background-size: 70px;
           opacity: 0.1;
           animation: ${float} 6s ease-in-out infinite;
         }

         @media (max-width: 470px) {
          padding: 1rem 0;
          &::before { background-size: 50px; }
        }
`




const shine = keyframes`
  0% { background-position: -200%; }
  100% { background-position: 200%; }
`;

const H1 = styled.h1`
         text-align: center;
         font-size: 5rem;
         color: #ffd203;
         background: linear-gradient(90deg, #ffd203 0%, #fff 50%, #ffd203 100%);
         background-size: 200% auto;
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
         background-clip: text;
         animation: ${shine} 3s linear infinite;
         -webkit-text-stroke-width: 2px; 
         -webkit-text-stroke-color: #1f57b5; 
         font-family: 'Pokemon Solid', sans-serif;
         letter-spacing: 5px;
         filter: drop-shadow(0 0 20px rgba(255, 210, 3, 0.5));
         z-index: 1;
         margin: 2rem 0;

        @media (max-width: 768px) { font-size: 4.5rem; }
        @media (max-width: 470px) { font-size: 3.5rem; }
        @media (max-width: 375px) { font-size: 2.8rem; }
`


const SearchContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 2rem 0;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    transform: scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: #999;
  }
`;

const PokemonNumber = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0.7;
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const TypeBadge = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

const H2 = styled.h2`
         font-size: 1.3rem;
         text-transform: capitalize;
         margin: 0.5rem 0;
         font-family: 'Pokemon Solid', sans-serif;
         letter-spacing: 3px;
         text-shadow: 2px 2px 4px rgba(0,0,0,0.2);

         @media (max-width: 470px) { font-size: 1rem; }
         @media (max-width: 375px) { font-size: 0.9rem; }
`




const Ol = styled.ol`
         display: grid;
         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
         gap: 2rem;
         padding: 2rem;
         max-width: 1400px;
         width: 100%;
         z-index: 1;

         @media (max-width: 768px) {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }
        @media (max-width: 470px) {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
`

const Li = styled.li`
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         padding: 2rem 1rem;
         border-radius: 20px;
         min-height: 300px;
         text-align: center;
         position: relative;
         cursor: pointer;
         transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
         animation: ${fadeIn} 0.6s ease-out;
         background: linear-gradient(135deg, var(--bg-color) 0%, var(--bg-color) 100%);
         box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
                     0 0 0 1px rgba(255, 255, 255, 0.1) inset;
         overflow: hidden;

         &::before {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
           opacity: 0;
           transition: opacity 0.3s ease;
         }

         &:hover {
           transform: translateY(-10px) scale(1.03);
           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
                       0 0 30px rgba(255, 255, 255, 0.2) inset;
           
           &::before {
             opacity: 1;
           }
         }

         @media (max-width: 470px) {
          min-height: 250px;
          padding: 1.5rem 1rem;
        }
`

const Img = styled.img`
         width: 120px;
         height: 120px;
         margin: 1rem 0;
         filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
         transition: all 0.3s ease;
         animation: ${float} 3s ease-in-out infinite;

         ${Li}:hover & {
           transform: scale(1.2) rotate(5deg);
           filter: drop-shadow(0 10px 25px rgba(0,0,0,0.5));
         }
         
         @media (max-width: 460px) { width: 90px; height: 90px; }
         @media (max-width: 375px) { width: 80px; height: 80px; }
`


const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Button = styled.button`
        width: 120px;
        height: 120px;
        display: inline-block;
        margin: 3rem;
        position: relative;
        color: #fff;
        border: 8px solid #fff;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #ff4444 0%, #cc0000 50%, #000 100%);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                    inset 0 -5px 20px rgba(0, 0, 0, 0.5),
                    inset 0 5px 20px rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        animation: ${pulse} 2s ease-in-out infinite;
        z-index: 1;
        font-weight: bold;
        font-size: 0.9rem;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(255, 0, 0, 0.6),
                      inset 0 -5px 20px rgba(0, 0, 0, 0.5),
                      inset 0 5px 20px rgba(255, 255, 255, 0.4);
        }

        &:active {
          transform: scale(0.95);
        }

        @media (max-width: 460px) {
         width: 80px;
         height: 80px;
         font-size: 0.75rem;
        }
`


export { PokemonList }