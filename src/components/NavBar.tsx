import styled from "styled-components"
import { WideBox } from "src/common/Box"
import { GameText } from "src/common/Text"
import { Colors } from "src/utils/Colors"

export const Container = styled(WideBox)`
  position: fixed;
  width: 100%;
  justify-content: space-between;
  padding: 24px 100px;
  z-index: 9998;
  background: ${Colors.LIGHT_GRAY};
`
interface NavBarProps {
  onSearchChange: (query: string) => void
}

const NavBar = ({ onSearchChange }: NavBarProps) => {
  return (
    <Container h={80}>
      <GameText fs={30}>PokeDex</GameText>
      <input
        placeholder="Search"
        type="text"
        onChange={e => onSearchChange(e.target.value)}
      />
    </Container>
  )
}

export default NavBar
