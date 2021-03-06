import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

export const SpinnerOverlay = styled.div`
  position: fixed;
  pointer-events: all;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`

export const SpinnerContainer = styled.div`
  position: absolute;
  width: 10em;
  height: 100em;
  top: 20%;
  left: 50%;
  margin-left: -1.5em;
`

export const Spinner: React.FC = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer>
        <FontAwesomeIcon icon={faCompactDisc} spin={true} size="3x" />
      </SpinnerContainer>
    </SpinnerOverlay>
  )
}
