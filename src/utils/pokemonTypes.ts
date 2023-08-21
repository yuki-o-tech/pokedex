export interface PokemonAllResponseData {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonDetail {
  abilities: AbilityDetail[]
  base_experience: number
  forms: NamedAPIResource[]
  game_indices: GameIndex[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: MoveDetail[]
  name: string
  order: number
  past_types: any[] // この部分は具体的な型情報が提供されていないので、一時的にanyを使用しています。
  species: NamedAPIResource
  sprites: Sprites
  stats: StatDetail[]
  types: TypeDetail[]
  weight: number
}

interface AbilityDetail {
  ability: NamedAPIResource
  is_hidden: boolean
  slot: number
}

interface GameIndex {
  game_index: number
  version: NamedAPIResource
}

interface HeldItem {
  item: NamedAPIResource
  version_details: VersionDetail[]
}

interface VersionDetail {
  rarity: number
  version: NamedAPIResource
}

interface MoveDetail {
  move: NamedAPIResource
  version_group_details: VersionGroupDetail[]
}

interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
}

interface Sprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string
  front_female: string | null
  front_shiny: string
  front_shiny_female: string | null
}

interface StatDetail {
  base_stat: number
  effort: number
  stat: NamedAPIResource
}

export interface TypeDetail {
  slot: number
  type: NamedAPIResource
}

export interface NamedAPIResource {
  name: string
  url: string
}
