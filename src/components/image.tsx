import React from 'react'
import styled from 'styled-components'
import { ThemeColors } from '../shared/colors'

const ImageContainer = styled.img`
  max-width: 100%;
  border-radius: 1em;
  border-radius: 0.5em;
  min-width: 12em;
  min-height: 12em;
  background-color: ${ThemeColors.IMG};
`
export interface ImageProps {
  src: string
  alt: string
}

export const Img: React.FC<ImageProps> = ({ src, alt }) => {
  return <ImageContainer src={src} loading="lazy" alt={alt} />
}
