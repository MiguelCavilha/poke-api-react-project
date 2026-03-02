import { useEffect, useState } from "react";
import { getPokemonAbilities } from "../../services/poke-api";
import { styled, keyframes } from 'styled-components';


const Abilities = ({ pokemon = [] }) => {
  const [ability, setAbility] = useState([]);

  useEffect(() => {
    
    async function fetchAbility() {
      const newAbility = await Promise.all(pokemon?.abilities.map(async ability => await
       await getPokemonAbilities(ability.ability.name)))
        setAbility(newAbility);
      }

    fetchAbility();
  }, [ pokemon]);

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {ability?.map((data, index) => (
        <Li key={index}>
          <H3>{data.name}</H3>
          <P>{data?.effect_entries.find((data) => data.language.name === "en")?.effect}</P>
        </Li>
      ))}
    </ul>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.8rem 0;
  background: rgba(79, 195, 247, 0.1);
  border-left: 4px solid #4fc3f7;
  border-radius: 10px;
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(79, 195, 247, 0.2);
    transform: translateX(10px);
  }
`

const H3 = styled.h3`
  font-size: 1.3rem;
  text-transform: capitalize;
  color: #4fc3f7;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`

const P = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  text-transform: none;
`

export { Abilities }