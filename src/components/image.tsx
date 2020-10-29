import { isNil } from 'lodash'
import React, { MutableRefObject, useRef } from 'react'
import styled from 'styled-components'
import { ThemeColors } from '../shared/colors'

const ImageContainer = styled.img`
  max-width: 100%;
  border-radius: 1em;
  border-radius: 0.5em;
  background-color: ${ThemeColors.IMG};
`
export interface ImageProps {
  src: string
  placeholder: string
}

function getImage(src: string, ref: MutableRefObject<null>): void {
  const img = new Image()
  img.onload = () => {
    const elRef: HTMLImageElement | null | undefined = ref.current
      ? ref.current
      : null
    // assign new image to the component when it is loaded
    if (!isNil(elRef)) {
      ;(elRef as any).src = src
    }
  }
  img.src = src
}

export const Img: React.FC<ImageProps> = ({ src, placeholder }) => {
  const imgRef = useRef(null)
  getImage(src, imgRef)

  return <ImageContainer ref={imgRef} src={placeholder} />
}
