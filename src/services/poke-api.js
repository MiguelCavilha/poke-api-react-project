import axios from 'axios';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export async function getPokemon(name) {
  const res = await pokeApi.get(`pokemon/${name}`);
  return res.data;
}

export async function getPokemonSprite(name) {
    const res = await pokeApi.get(`pokemon/${name}`);
    return res.data.sprites.other.dream_world.front_default || 
           res.data.sprites.other['official-artwork'].front_default || 
           res.data.sprites.front_default;
  }
  

export async function getPokemonList(limit, offset = 0) {
    const res = await pokeApi.get('/pokemon', {
      params: {
        limit: limit,
        offset: offset
      }
    });
  
    return res.data.results;
  }
  


  export async function getPokemonAbilities(name) {
    const res = await pokeApi.get(`/ability/${name}`)
    return res.data
  }
  
  