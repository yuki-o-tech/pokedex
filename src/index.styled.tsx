import styled from "styled-components"
import Box from "./common/Box"

export const Grid = styled(Box)`
  padding-top: 140px;
  padding-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(4, 200px);
  column-gap: 20px;
  row-gap: 20px;
  justify-content: center;

  .fade-entering,
  .fade-exiting,
  .fade-exited {
    transition: opacity 300ms ease-in;
  }

  .fade-entered {
    opacity: 0;
    transition: opacity 300ms ease-in;
  }
`
