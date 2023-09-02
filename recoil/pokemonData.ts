import { atom } from "recoil"
import { PokemonAllResponseData, PokemonDetail } from "src/utils/pokemonTypes"

// 初期のポケモンデータを保存するためのRecoilステート
// このステートは、アプリが最初にロードされたときに設定されます
export const initialPokemonDataState = atom<PokemonAllResponseData | null>({
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

// 次のページのURLを保存するためのRecoilステート
// このステートは、次のページに遷移するためのリンクを生成する際に使用されます
export const nextUrlState = atom<string | null>({
  key: "nextUrlState",
  default: null,
})

// 前のページのURLを保存するためのRecoilステート
// このステートは、前のページに戻るためのリンクを生成する際に使用されます
export const prevUrlState = atom<string | null>({
  key: "prevUrlState",
  default: null,
})
