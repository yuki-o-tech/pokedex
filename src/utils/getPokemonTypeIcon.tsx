import React from "react"
import Box from "src/common/Box"
import NormalIcon from "src/icons/NormalIcon"
import FireIcon from "src/icons/FireIcon"
import WaterIcon from "src/icons/WaterIcon"
import GrassIcon from "src/icons/GrassIcon"
import ElectricIcon from "src/icons/ElectricIcon"
import IceIcon from "src/icons/IceIcon"
import FightingIcon from "src/icons/FightingIcon"
import PoisonIcon from "src/icons/PoisonIcon"
import GroundIcon from "src/icons/GroundIcon"
import FlyingIcon from "src/icons/FlyingIcon"
import PsychicIcon from "src/icons/PsychicIcon"
import BugIcon from "src/icons/BugIcon"
import RockIcon from "src/icons/RockIcon"
import GhostIcon from "src/icons/GhostIcon"
import DragonIcon from "src/icons/DragonIcon"
import DarkIcon from "src/icons/DarkIcon"
import SteelIcon from "src/icons/SteelIcon"
import FairyIcon from "src/icons/FairyIcon"

import { Colors, TypeColors } from "./Colors"

export const getPokemonTypeIconColor = (type: string): string => {
  switch (type) {
    case "ノーマル":
      return TypeColors.NORMAL
    case "ほのお":
      return TypeColors.FIRE
    case "みず":
      return TypeColors.WATER
    case "くさ":
      return TypeColors.GRASS
    case "でんき":
      return TypeColors.ELECTRIC
    case "こおり":
      return TypeColors.ICE
    case "かくとう":
      return TypeColors.FIGHTING
    case "どく":
      return TypeColors.POISON
    case "じめん":
      return TypeColors.GROUND
    case "ひこう":
      return TypeColors.FLYING
    case "エスパー":
      return TypeColors.PSYCHIC
    case "むし":
      return TypeColors.BUG
    case "いわ":
      return TypeColors.ROCK
    case "ゴースト":
      return TypeColors.GHOST
    case "ドラゴン":
      return TypeColors.DRAGON
    case "あく":
      return TypeColors.DARK
    case "はがね":
      return TypeColors.STEEL
    case "フェアリー":
      return TypeColors.FAIRY
    default:
      return Colors.BLACK
  }
}

export const getPokemonTypeIcon = (type: string): JSX.Element => {
  switch (type) {
    case "ノーマル":
      return <NormalIcon />
    case "ほのお":
      return <FireIcon />
    case "みず":
      return <WaterIcon />
    case "くさ":
      return <GrassIcon />
    case "でんき":
      return <ElectricIcon />
    case "こおり":
      return <IceIcon />
    case "かくとう":
      return <FightingIcon />
    case "どく":
      return <PoisonIcon />
    case "じめん":
      return <GroundIcon />
    case "ひこう":
      return <FlyingIcon />
    case "エスパー":
      return <PsychicIcon />
    case "むし":
      return <BugIcon />
    case "いわ":
      return <RockIcon />
    case "ゴースト":
      return <GhostIcon />
    case "ドラゴン":
      return <DragonIcon />
    case "あく":
      return <DarkIcon />
    case "はがね":
      return <SteelIcon />
    case "フェアリー":
      return <FairyIcon />
    default:
      return <Box />
  }
}
