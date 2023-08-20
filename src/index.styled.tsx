import styled from "styled-components"
import Box from "./common/Box"

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  column-gap: 20px;
  row-gap: 20px;
  justify-content: center;
`
