import { useEffect, useState } from "react"
import Image from "next/image"
import {
  PokemonDetail,
  TypeDetail,
  getAllPokemon,
  loadPokemon,
} from "./utils/pokemon"
import { BASE_POKE_API } from "@/pages/api/request"
import Card from "./common/Card"
import { Grid } from "./index.styled"

const MainScreen = () => {
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
      {loading ? (
        <div>"Loading..." </div>
      ) : (
        <Grid>
          {pokemonData.map((pokemon: PokemonDetail, index) => {
            console.log("img", pokemon.sprites.front_default)
            return (
              <>
                <Card url={pokemon.sprites.front_default} name={pokemon.name} />

                {/* <div>type:</div> */}
                {/* {pokemon.types.map((pokeType: TypeDetail, index) => {
                return <div>{pokeType.type.name}</div>
              })} */}
                {/* <div>weight:{pokemon.weight}</div>
              <div>height:{pokemon.height}</div>
              <div>ability:{pokemon.abilities[0].ability.name}</div> */}
              </>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default MainScreen
