import { useEffect, useState } from "react"
import {
  PokemonDetail,
  TypeDetail,
  getAllPokemon,
  loadPokemon,
} from "src/utils/pokemon"
import { BASE_POKE_API } from "./api/request"
import Image from "next/image"

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(BASE_POKE_API)
      const loadedPokemonData = await loadPokemon(res.results)
      setLoading(false)
      setPokemonData(loadedPokemonData as [])
    }
    fetchPokemonData()
  }, [])
  return (
    <>
      <h2>PokeDex</h2>
      {loading ? (
        <div>"Loading..." </div>
      ) : (
        pokemonData.map((pokemon: PokemonDetail, index) => {
          console.log("img", pokemon.sprites.front_default)
          return (
            <>
              <Image
                src={pokemon.sprites.front_default}
                alt=""
                width={90}
                height={90}
              />
              <div>{pokemon.name}</div>
              <div>type:</div>
              {pokemon.types.map((pokeType: TypeDetail, index) => {
                return <div>{pokeType.type.name}</div>
              })}
              <div>weight:{pokemon.weight}</div>
              <div>height:{pokemon.height}</div>
              <div>ability:{pokemon.abilities[0].ability.name}</div>
            </>
          )
        })
      )}
    </>
  )
}

export default Page
