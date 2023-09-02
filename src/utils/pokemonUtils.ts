import {
  NamedAPIResource,
  PokemonAllResponseData,
  PokemonDetail,
} from "./pokemonTypes"

export const INITIAL_POKE_API = "https://pokeapi.co/api/v2/pokemon"

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

export const getAllPokemon = (url: string): Promise<PokemonAllResponseData> => {
  return fetchData(url)
}

export const getPokemon = (url: string): Promise<PokemonDetail> => {
  return fetchData(url)
}

export const loadPokemon = async (data: Array<NamedAPIResource>) => {
  const pokemonData = await Promise.all(data.map(el => getPokemon(el.url)))
  return pokemonData as PokemonDetail[]
}
