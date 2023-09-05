import Image from "next/image"
import { styled } from "styled-components"
import Box, { CenterCol, CenterRow } from "./Box"
import { GameText } from "./Text"

import { Colors, TypeColors } from "src/utils/Colors"

interface CardProps {
  name: string
  imgUrl: string | null
  height: number
  weight: number
  pokeTypes: PokemonTypeInfo[]
}

export interface PokemonTypeInfo {
  type: string
  color: string
  icon: () => JSX.Element
}

interface ContainerProps {
  borderColor: string
}

const Container = styled(CenterCol)<ContainerProps>`
  padding: 10px;
  border: 2px solid
    ${props => (props.borderColor ? props.borderColor : Colors.BLACK)};
  background-image: linear-gradient(
    315deg,
    ${Colors.WHITE} 30%,
    ${props => (props.borderColor ? props.borderColor : Colors.BLACK)}
  );
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    // TODO: add Click event
    // cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0px 4px 0px 0px
      ${props => (props.borderColor ? props.borderColor : Colors.BLACK)};
  }
`

const TypeBox = styled(Box)`
  flex-wrap: wrap;
  justify-content: center;
`

const Card = ({ name, imgUrl, height, weight, pokeTypes }: CardProps) => {
  return (
    <Container
      w={200}
      h={300}
      gap={8}
      radius={10}
      borderColor={pokeTypes.length > 0 ? pokeTypes[0].color : Colors.BLACK}
    >
      {imgUrl === null ? (
        <CenterRow w={120} h={100}>
          <GameText fs={24}>No Image</GameText>
        </CenterRow>
      ) : (
        <Image src={imgUrl} alt={name} width={120} height={120} />
      )}
      <GameText fs={20}>{name}</GameText>
      {height !== null && <GameText fs={14}>たかさ：{height}m</GameText>}
      {weight !== null && <GameText fs={14}>おもさ：{weight}kg</GameText>}
      <TypeBox>
        <GameText fs={12}>タイプ：</GameText>
        {pokeTypes.map((typeInfo: PokemonTypeInfo, index: number) => (
          <Box key={index} gap={5}>
            <Box gap={2}>
              <GameText fs={12}>{typeInfo.type}</GameText>
              <CenterRow w={20} h={20} radius={20} bgc={typeInfo.color}>
                {typeInfo.icon()}
              </CenterRow>
            </Box>
            {index < pokeTypes.length - 1 && <GameText fs={12}>/</GameText>}
          </Box>
        ))}
      </TypeBox>
    </Container>
  )
}

export default Card
