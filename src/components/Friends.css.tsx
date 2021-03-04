import styled from 'styled-components'
import { WrapperSection } from './../GlobalStyle.css'

export const Wrapper = styled(WrapperSection)`
  padding-top: 10px;
  padding-bottom: 30px;
  text-align: center;
`

type ImageProps = {
  amountElements: number
}

export const ImageWrapper = styled.div`
  width: ${({ amountElements }: ImageProps) => amountElements >= 10 ? '100' : amountElements + '0'}%;
  text-align: center;
`