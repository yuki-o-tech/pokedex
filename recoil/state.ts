import { atom } from "recoil"
import { PokemonAllResponseData, PokemonDetail } from "src/utils/pokemon"

export const initialPokemonDataState = atom<PokemonAllResponseData | null>({
  key: "initialPokemonDataState",
  default: null,
})

export const pokemonDataState = atom<PokemonDetail[]>({
  key: "pokemonDataState",
  default: [],
})

export const loadingState = atom({
  key: "loadingState",
  default: true,
})

export const nextUrlState = atom<string | null>({
  key: "nextUrlState",
  default: null,
})

export const prevUrlState = atom<string | null>({
  key: "prevUrlState",
  default: null,
})
