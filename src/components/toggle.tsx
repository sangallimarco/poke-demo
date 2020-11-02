import React from 'react'
import { Button } from './button'

interface ToggleButtonProps {
  status: boolean
  onAdd: () => void
  onRemove: () => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  status,
  onAdd,
  onRemove,
}) =>
  !status ? (
    <Button color="primary" onClick={onAdd}>
      Add to Favourites
    </Button>
  ) : (
    <Button onClick={onRemove}>Remove from Favourites</Button>
  )
