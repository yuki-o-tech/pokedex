import Image from "next/image"
import { CenterCol, CenterRow } from "./Box"
import { GameText } from "./Text"
import { styled } from "styled-components"
import { Colors } from "src/utils/Colors"

interface CardProps {
  name: string
  imgUrl: string | null
  height: number
  weight: number
  pokeType: string
}

const Container = styled(CenterCol)`
  border: 1px solid ${Colors.BLACK};
  width: 200px;
  height: 200px;
  border: 2px solid #d3a77b;
  background-color: ${Colors.WHITE};
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0px 4px 0px 0px #d3a77b;
  }
`

const Card = ({ name, imgUrl, height, weight, pokeType }: CardProps) => {
  return (
    <Container w={200} h={200} radius={10}>
      {imgUrl === null ? (
        <CenterRow w={120} h={100}>
          <GameText fs={24}>No Image</GameText>
        </CenterRow>
      ) : (
        <Image src={imgUrl} alt={name} width={100} height={100} />
      )}
      <GameText fs={20}>{name}</GameText>
      {height !== null && <GameText fs={14}>たかさ：{height}m</GameText>}
      {weight !== null && <GameText fs={14}>おもさ：{weight}kg</GameText>}
      <GameText fs={14}>タイプ：{pokeType}</GameText>
    </Container>
  )
}

export default Card
