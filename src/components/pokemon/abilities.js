import { useEffect, useState } from "react";
import { getPokemonAbilities } from "../../services/poke-api";
import { styled } from 'styled-components';


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
    <ul>
      {ability?.map((data, index) => (
        <Li key={index}>
          <H3>{data.name}:</H3>
          <P>{data?.effect_entries.find((data) => data.language.name === "en")?.effect}</P>
        </Li>
      ))}
    </ul>
  )
}

const Li = styled.li`
         display: flex;
         flex-direction: row;
         align-items: center;

`

const H3 = styled.h3`
         font-size: 1.5rem;
         margin: 1rem;
         text-transform: capitalize;

`

const P = styled.p`
         font-size: 1rem;
         margin-top: 2rem;
         text-transform: capitalize;
         text-indent: 1rem;

`

export { Abilities }