import { atom } from "recoil"
import { PokemonResponseData, PokemonBasicData } from "src/utils/pokemonTypes"

// 初期のポケモンデータを保存するためのRecoilステート
// このステートは、アプリが最初にロードされたときに設定されます
export const initialPokemonDataState = atom<PokemonResponseData | null>({
  key: "initialPokemonDataState",
  default: null,
})

// ポケモンの詳細データ（名前、画像など）を保存するためのRecoilステート
// このステートは、ユーザーがページを切り替えたときなどに更新されます
export const pokemonDataState = atom<PokemonBasicData[]>({
  key: "pokemonDataState",
  default: [],
})

// アプリがデータを非同期で取得している間に表示するローディングインジケータの状態を管理するRecoilステート
export const loadingState = atom({
  key: "loadingState",
  default: true,
})

// // 各ポケモンの詳細情報を保存するためのRecoilステート
// export const pokemonJapaneseDetailDataState = atom<
//   Record<string, PokemonDetail>
// >({
//   key: "pokemonDetailDataState",
//   default: {},
// })
export const pokemonJapaneseNameState = atom({
  key: "pokemonJapaneseNameState",
  default: [] as string[],
})

export const pokemonTypeInJapaneseState = atom({
  key: "pokemonTypeInJapaneseState",
  default: [] as (string | null)[][],
})
