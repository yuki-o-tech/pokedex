import styled from "styled-components"

export interface BoxProps {
  bgc?: string
  h?: number
  mh?: number
  maxH?: number
  w?: number
  mw?: number
  maxW?: number
  p?: number
  pt?: number
  pl?: number
  pr?: number
  pb?: number
  f1?: boolean
  mr?: number
  ml?: number
  mrAuto?: boolean
  centerAlign?: boolean
  gap?: number
}

export const Box = styled.div<BoxProps>`
  display: flex;
  ${props => (props.w ? `width: ${props.w}px;` : null)}
  ${props => (props.mw ? `min-width: ${props.mw}px;` : null)}
  ${props => (props.maxW ? `max-width: ${props.maxW}px;` : null)}
  ${props => (props.h ? `height: ${props.h}px;` : null)}
  ${props => (props.mh ? `min-height: ${props.mh}px;` : null)}
    ${props => (props.maxH ? `max-height: ${props.maxH}px;` : null)}
  ${props => (props.bgc ? `background: ${props.bgc};` : null)}
  ${props => (props.p ? `padding: ${props.p}px;` : null)}
  ${props => (props.pt ? `padding-top: ${props.pt}px;` : null)}
  ${props => (props.pl ? `padding-left: ${props.pl}px;` : null)}
  ${props => (props.pr ? `padding-right: ${props.pr}px;` : null)}
  ${props => (props.pb ? `padding-bottom: ${props.pb}px;` : null)}
  ${props => (props.mrAuto ? "margin-right: auto;" : null)}
  ${props => (props.f1 ? "flex: 1;" : null)}
  ${props => (props.mr ? `margin-right: ${props.mr}px;` : null)}
  ${props => (props.ml ? `margin-left: ${props.ml}px;` : null)}
  ${props => (props.centerAlign ? "align-items: center;" : null)}
  ${props => (props.gap ? `gap: ${props.gap}px;` : null)}
`

export const Row = styled(Box)`
  display: flex;
  flex-direction: row;
`

export const Col = styled(Box)`
  flex-direction: column;
`

export const Center = styled(Box)`
  justify-content: center;
  align-items: center;
`

export const WideBox = styled(Box)`
  width: 100%;
`

export const WideCol = styled(Col)`
  width: 100%;
`

export const CenterRow = styled(Center)`
  flex-direction: row;
`

export const Space = styled(Box)`
  flex: 1;
`

export const CenterCol = styled(Center)`
  flex-direction: column;
`

export const TextEndBox = styled(Box)`
  justify-content: flex-end;
`

export const RightAlignBox = styled(Box)`
  justify-content: flex-end;
`

export default Box
