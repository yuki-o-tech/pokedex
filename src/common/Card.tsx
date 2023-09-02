import Image from "next/image"
import Box, { CenterCol, CenterRow } from "./Box"
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
  border: 2px solid #d3a77b;
  background-color: #f5e5c0;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0px 4px 0px 0px #d3a77b;
  }
`

const Card = ({ name, url }: CardProps) => {
  return (
    <Container w={200} h={200} radius={10}>
      {url === null ? (
        <CenterRow w={120} h={100}>
          <Text fs={24}>No Image</Text>
        </CenterRow>
      ) : (
        <Image src={url} alt={name} width={100} height={100} />
      )}
      <Text fs={24}>{name}</Text>
    </Container>
  )
}

export default Card
