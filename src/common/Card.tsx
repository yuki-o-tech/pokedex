import Image from "next/image"
import Box, { CenterCol } from "./Box"
import Text from "./Text"
import { styled } from "styled-components"
import { Colors } from "src/utils/Colors"

interface CardProps {
  name: string
  url: string
}

const Container = styled(CenterCol)`
  border: 1px solid ${Colors.BLACK};
  width: 200px;
  height: 200px;
  border: 2px solid #d3a77b; // レトロなボーダーカラー
  background-color: #f5e5c0; // レトロな背景カラー
  border-radius: 10px; // 角を少し丸める
  transition: transform 0.3s ease, box-shadow 0.3s ease; // なめらかなホバー効果のためのアニメーション設定

  &:hover {
    cursor: pointer;
    transform: translateY(-5px); // 上に少し動く
    box-shadow: 0px 4px 0px 0px #d3a77b; // 影の効果
  }
`

const Card = ({ name, url }: CardProps) => {
  return (
    <Container w={200} h={200} radius={10}>
      <Image src={url} alt={name} width={100} height={100} />
      <Text fs={24}>{name}</Text>
    </Container>
  )
}

export default Card
