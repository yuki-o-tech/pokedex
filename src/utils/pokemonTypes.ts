export interface PokemonResponseData {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonBasicData {
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
  past_types: any[] // 一時的にanyを使用しています。
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
  other: SpritesOther
}

interface SpritesOther {
  dream_world: FrontSprites
  home: FrontSprites
  "official-artwork": FrontSprites
}

interface FrontSprites {
  front_default: string | null
  front_shiny: string | null
  front_female: string | null
  front_shiny_female: string | null
}

interface StatDetail {
  base_stat: number
  effort: number
  stat: NamedAPIResource
}

export interface NamedAPIResource {
  name: string
  url: string
}

export interface TypeDetail {
  slot: number
  type: TypeUrlPair
}

// pokemonBasicData.types
interface TypeUrlPair {
  name: string
  url: string
}

interface DamageRelation {
  double_damage_from: TypeUrlPair[]
  double_damage_to: TypeUrlPair[]
  half_damage_from: TypeUrlPair[]
  half_damage_to: TypeUrlPair[]
  no_damage_from: TypeUrlPair[]
  no_damage_to: TypeUrlPair[]
}

interface GameIndex {
  game_index: number
  generation: TypeUrlPair
}

interface Move {
  name: string
  url: string
}

export interface LanguageNamePair {
  language: TypeUrlPair
  name: string
}

interface PastDamageRelation {
  damage_relations: DamageRelation
  generation: TypeUrlPair
}

interface PokemonSlotPair {
  pokemon: TypeUrlPair
  slot: number
}

export interface PokemonTypeData {
  damage_relations: DamageRelation
  game_indices: GameIndex[]
  generation: TypeUrlPair
  id: number
  move_damage_class: TypeUrlPair
  moves: Move[]
  name: string
  names: LanguageNamePair[]
  past_damage_relations: PastDamageRelation[]
  pokemon: PokemonSlotPair[]
}

//Japanese data
export interface PokemonDetailData {
  base_happiness: number
  capture_rate: number
  color: NamedAPIResource
  egg_groups: NamedAPIResource[]
  evolution_chain: NamedAPIResource
  evolves_from_species: null | NamedAPIResource
  flavor_text_entries: FlavorTextEntry[]
  form_descriptions: any[] // Replace with appropriate type if known
  forms_switchable: boolean
  gender_rate: number
  genera: Genera[]
  generation: NamedAPIResource
  growth_rate: NamedAPIResource
  habitat: NamedAPIResource
  has_gender_differences: boolean
  hatch_counter: number
  id: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  names: LanguageName[]
  order: number
  pal_park_encounters: PalParkEncounter[]
  pokedex_numbers: PokedexNumber[]
  shape: NamedAPIResource
  varieties: Variety[]
}

type LanguageNamenameType =
  | "ja-Hrkt"
  | "roomaji"
  | "ko"
  | "zh-Hant"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "en"
  | "ja"
  | "zh-Hans"

interface LanguageNamedAPIResource {
  name: LanguageNamenameType
  url: string
}

interface FlavorTextEntry {
  flavor_text: string
  language: LanguageNamedAPIResource
  version: NamedAPIResource
}

interface Genera {
  genus: string
  language: LanguageNamedAPIResource
}

interface LanguageName {
  language: LanguageNamedAPIResource
  name: string
}

interface PalParkEncounter {
  area: NamedAPIResource
  base_score: number
  rate: number
}

interface PokedexNumber {
  entry_number: number
  pokedex: NamedAPIResource
}

interface Variety {
  is_default: boolean
  pokemon: NamedAPIResource
}

type PokemonVersion =
  | "red"
  | "blue"
  | "yellow"
  | "gold"
  | "silver"
  | "crystal"
  | "ruby"
  | "sapphire"
  | "emerald"
  | "firered"
  | "leafgreen"
  | "diamond"
  | "pearl"
  | "platinum"
  | "heartgold"
  | "soulsilver"
  | "black"
  | "white"
  | "black-2"
  | "white-2"
  | "x"
  | "y"
  | "omega-ruby"
  | "alpha-sapphire"
  | "sun"
  | "moon"
  | "ultra-sun"
  | "ultra-moon"
  | "lets-go-pikachu"
  | "lets-go-eevee"
  | "sword"
  | "shield"
