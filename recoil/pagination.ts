import { atom, selector } from "recoil"
import { PokemonDetail, PokemonResponseData } from "src/utils/pokemonTypes"
import {
  INITIAL_POKE_API,
  get20Pokemons,
  loadPokemon,
} from "src/utils/pokemonUtils"

// 現在のページ番号を管理するためのRecoilステート
// このステートは、ユーザーがページを切り替えたときに更新されます
export const currentPageState = atom({
  key: "currentPageState",
  default: 1, // デフォルト値は1（最初のページ）
})

// 現在のページに表示するポケモンのリストを非同期で取得するRecoilセレクター
// currentPageStateに依存しており、その値が変更されたときに再計算されます
//今使用していません
export const pokemonListState = selector<PokemonDetail[]>({
  key: "pokemonListState",
  get: async ({ get }) => {
    const currentPage = get(currentPageState) // 現在のページ番号を取得
    console.log("call currentPage in the pokemonList", currentPage)
    const offset = (currentPage - 1) * 20 // オフセットを計算（1ページあたり20項目）
    console.log("call offset in the pokemonList", offset)
    // APIエンドポイント
    const data: PokemonResponseData = await get20Pokemons(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    )
    return loadPokemon(data.results) // ポケモンの詳細データを非同期で取得
  },
})

// 全ポケモンの総数を非同期で取得するRecoilセレクター
// このセレクターは、ページネーションコントロールの作成に使用されます
export const totalPokemonState = selector<number>({
  key: "totalPokemonState",
  get: async () => {
    const data: PokemonResponseData = await get20Pokemons(INITIAL_POKE_API) // 初期APIエンドポイントからデータを取得
    return data.count // 総数を返す
  },
})
