import {
  NamedAPIResource,
  PokemonResponseData,
  PokemonDetail,
} from "./pokemonTypes"

export const INITIAL_POKE_API = "https://pokeapi.co/api/v2/pokemon"

export const getPokemonListUrl = (offsetValue: number) => {
  console.log(" offsetValue * 20 - 20", offsetValue * 20 - 20)
  return `https://pokeapi.co/api/v2/pokemon?offset=${
    offsetValue * 20 - 20
  }&limit=20`
}

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export const get20Pokemons = (url: string): Promise<PokemonResponseData> => {
  return fetchData(url)
}

export const getPokemon = (url: string): Promise<PokemonDetail> => {
  return fetchData(url)
}

export const loadPokemon = async (data: Array<NamedAPIResource>) => {
  const pokemonData = await Promise.all(data.map(el => getPokemon(el.url)))
  return pokemonData as PokemonDetail[]
}
