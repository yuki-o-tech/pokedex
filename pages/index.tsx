import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

import MainScreen from "src/MainScreen"
import NavBar from "src/components/NavBar"
import {
  initialPokemonDataState,
  loadingState,
  pokemonDataState,
} from "../recoil/pokemonData"
import { PokemonDetail } from "src/utils/pokemonTypes"
import {
  INITIAL_POKE_API,
  get20Pokemons,
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
    // 初期データを非同期で取得する
    const fetchInitialData = async () => {
      try {
        setLoading(true) // 最初にローディングの状態をtrueに更新
        // 全ポケモンのデータを取得
        const res = await get20Pokemons(INITIAL_POKE_API)
        // 初期データをRecoilステートに保存
        setInitialPokemonData(res)
        // ポケモンの詳細データを非同期で取得
        const loadedPokemonData = await loadPokemon(res.results)
        // 詳細データをRecoilステートに保存
        setPokemonData(loadedPokemonData as PokemonDetail[])
        setLoading(false) // 最後にローディングの状態をfalseに更新
      } catch (error) {
        console.error("Failed to fetch data:", error)
        // ローディング状態をfalseに設定
        setLoading(false)
      }
    }

    // 非同期関数を実行
    fetchInitialData()
  }, []) // 依存配列が空なので、このuseEffectはマウント時に一回だけ実行される

  return (
    <>
      <NavBar onSearchChange={setSearchQuery} />
      <MainScreen />
    </>
  )
}

export default Page
