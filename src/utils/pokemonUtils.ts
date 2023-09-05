import {
  NamedAPIResource,
  PokemonResponseData,
  PokemonBasicData,
  PokemonDetailData,
  TypeDetail,
  PokemonTypeData,
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

export const getPokemon = (url: string): Promise<PokemonBasicData> => {
  return fetchData(url)
}

export const loadPokemon = async (data: Array<NamedAPIResource>) => {
  const pokemonData = await Promise.all(data.map(el => getPokemon(el.url)))
  //TODO: Adds Pokemon Details when adds the DetailModal
  // console.log("とくせい", pokemonData[0].abilities)

  return pokemonData as PokemonBasicData[]
}

// 特定のPokemonDetailDataオブジェクトから日本語の名前を取得
export const getJapanesePokemonData = (
  url: string
): Promise<PokemonDetailData> => {
  return fetchData(url)
}

export const getJapaneseName = (
  pokemonDetail: PokemonDetailData
): string | null => {
  const japaneseEntry = pokemonDetail.names.find(
    entry => entry.language.name === "ja"
  )

  //TODO: Adds Pokemon Details when adds the DetailModal
  // console.log("ぜんぶ'", pokemonDetail)
  // console.log("なまえ", pokemonDetail.names)
  // console.log("せつめい", pokemonDetail.flavor_text_entries)
  // console.log("ぶんるい", pokemonDetail.genera)
  return japaneseEntry ? japaneseEntry.name : null
}

export const getPokemonType = async (pokemonData: Array<TypeDetail>) => {
  try {
    const typeLanguageDataPromises = pokemonData.map(type =>
      fetchData(type.type.url)
    )

    const typeLanguageData: Array<PokemonTypeData> = await Promise.all(
      typeLanguageDataPromises
    )

    const japaneseTypes = typeLanguageData.map(
      (typeDetail: PokemonTypeData, index) => {
        console.log(`Processing typeDetail at index ${index}:`, typeDetail)

        try {
          const japaneseEntry = typeDetail.names.find(
            entry => entry.language.name === "ja"
          )
          return japaneseEntry ? japaneseEntry.name : null
        } catch (innerError) {
          console.error("Error while processing typeDetail:", innerError)
          return null
        }
      }
    )

    console.log("japaneseTypes", japaneseTypes)
    return japaneseTypes
  } catch (error) {
    console.error("An error occurred in getPokemonType:", error)
    return []
  }
}
