import { atom } from "recoil"
import { PokemonResponseData, PokemonDetail } from "src/utils/pokemonTypes"

// 初期のポケモンデータを保存するためのRecoilステート
// このステートは、アプリが最初にロードされたときに設定されます
export const initialPokemonDataState = atom<PokemonResponseData | null>({
  key: "initialPokemonDataState",
  default: null,
})

// ポケモンの詳細データ（名前、画像など）を保存するためのRecoilステート
// このステートは、ユーザーがページを切り替えたときなどに更新されます
export const pokemonDataState = atom<PokemonDetail[]>({
  key: "pokemonDataState",
  default: [],
})

// アプリがデータを非同期で取得している間に表示するローディングインジケータの状態を管理するRecoilステート
export const loadingState = atom({
  key: "loadingState",
  default: true,
})
