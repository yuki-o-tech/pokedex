import { useEffect, useState } from "react"
import {
  PokemonDetail,
  TypeDetail,
  getAllPokemon,
  loadPokemon,
} from "../src/utils/pokemon"
import { BASE_POKE_API } from "./api/request"
import Image from "next/image"
import MainScreen from "src/MainScreen"

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
      <MainScreen />
    </>
  )
}

export default Page
