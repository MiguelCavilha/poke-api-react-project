import { useEffect, useState } from "react";
import { getPokemonAbilities } from "../../services/poke-api";


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
        <li key={index}>
          <h3>{data.name}</h3>
          <p>{data?.effect_entries.find((data) => data.language.name === "en")?.effect}</p>
        </li>
      ))}
    </ul>
  )
}

export { Abilities }