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
import NavBar from "src/components/NavBar"

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(BASE_POKE_API)
      const loadedPokemonData = await loadPokemon(res.results)
      setLoading(false)
      setPokemonData(loadedPokemonData as [])
    }
    fetchPokemonData()
  }, [])

  const filteredData = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <>
      <NavBar onSearchChange={setSearchQuery} />
      <MainScreen dataArr={filteredData} isLoading={loading} />
    </>
  )
}

export default Page
