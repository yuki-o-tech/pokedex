import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

import MainScreen from "src/MainScreen"
import NavBar from "src/components/NavBar"
import {
  initialPokemonDataState,
  loadingState,
  pokemonDataState,
} from "../recoil/state"
import { PokemonDetail } from "src/utils/pokemonTypes"
import {
  INITIAL_POKE_API,
  getAllPokemon,
  loadPokemon,
} from "src/utils/pokemonUtils"

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const [initialPokemonData, setInitialPokemonData] = useRecoilState(
    initialPokemonDataState
  )
  const [pokemonData, setPokemonData] = useRecoilState(pokemonDataState)
  const [loading, setLoading] = useRecoilState(loadingState)

  useEffect(() => {
    const fetchInitialData = async () => {
      const res = await getAllPokemon(INITIAL_POKE_API)
      // 最初にinitialPokemonDataを更新
      setInitialPokemonData(res)
      // 次に、ポケモンの詳細データを取得し、pokemonDataを更新
      const loadedPokemonData = await loadPokemon(res.results)

      setPokemonData(loadedPokemonData as PokemonDetail[])
      // 最後にローディングの状態をfalseに更新
      setLoading(false)
    }

    fetchInitialData()
  }, [])

  return (
    <>
      <NavBar onSearchChange={setSearchQuery} />
      <MainScreen />
    </>
  )
}

export default Page
