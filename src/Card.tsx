import Image from "next/image"
import Box, { Col } from "./Box"
import Text from "./Text"

interface CardProps {
  name: string
  url: string
}

const Card = ({ name, url }: CardProps) => {
  return (
    <>
      <Col>
        <Image src={url} alt={name} width={100} height={100} />
        <Text>{name}</Text>
      </Col>
    </>
  )
}

export default Card
