import styled from "styled-components"
import { Colors } from "@/utils/Colors"

interface TextProps {
  color?: string
  fs?: number
  lh?: number
  fw?: number
  center?: boolean
  pb?: number
  pt?: number
  pr?: number
  pl?: number
  mrAuto?: boolean
  ls?: string
  for?: string
  w?: number
  h?: number
}

const Text = styled.div<TextProps>`
  font-size: ${props => (props.fs ? `${props.fs}px` : "14px")};
  color: ${props => (props.color ? `${props.color}` : Colors.BLACK)};
  ${({ lh }) => (lh ? `line-height: ${lh}px;` : null)};
  ${({ fw }) => (fw ? `font-weight: ${fw};` : null)};
  ${props => (props.center ? "text-align: center;" : null)};
  ${props => (props.pb ? `padding-bottom: ${props.pb}px;` : null)};
  ${props => (props.pr ? `padding-right: ${props.pr}px;` : null)}
  ${props => (props.pl ? `padding-left: ${props.pl}px;` : null)}
  ${props => (props.pt ? `padding-top: ${props.pt}px;` : null)}
  ${props => (props.mrAuto ? "margin-right: auto;" : null)};
  ${({ ls }) => (ls ? `letter-spacing: ${ls};` : null)};
  white-space: pre-line;
  ${props => (props.w ? `width: ${props.w}px;` : null)}
  ${props => (props.h ? `height: ${props.h}px;` : null)}
`

export const RobotoText = styled(Text)`
  font-family: Roboto;
`

export const NoWrapText = styled(Text)`
  white-space: nowrap;
`

export default Text
