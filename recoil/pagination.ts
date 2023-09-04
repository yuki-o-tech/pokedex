import { atom, selector } from "recoil"
import { PokemonResponseData } from "src/utils/pokemonTypes"
import { INITIAL_POKE_API, get20Pokemons } from "src/utils/pokemonUtils"

// 現在のページ番号を管理するためのRecoilステート
// このステートは、ユーザーがページを切り替えたときに更新されます
export const currentPageState = atom({
  key: "currentPageState",
  default: 1, // デフォルト値は1（最初のページ）
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
