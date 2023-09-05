import styled from "styled-components"
import { WideBox } from "src/common/Box"
import { GameText } from "src/common/Text"
import { Colors } from "src/utils/Colors"

const Container = styled(WideBox)`
  position: fixed;
  width: 100%;
  justify-content: space-between;
  padding: 24px 100px;
  z-index: 9998;
  background: ${Colors.WHITE};
  box-shadow: 0 3px 6px 0 ${Colors.LIGHT_GRAY};
`

const NavBarText = styled(GameText)`
  align-self: center;
`

interface NavBarProps {
  onSearchChange: (query: string) => void
}

const NavBar = ({ onSearchChange }: NavBarProps) => {
  return (
    <Container h={80}>
      <NavBarText fs={30}>PokeDex</NavBarText>
      {/* TODO: Adds Filter */}
      {/* <input
        placeholder="Search"
        type="text"
        onChange={e => onSearchChange(e.target.value)}
      /> */}
    </Container>
  )
}

export default NavBar
