import React from 'react'
import { Button } from './button'

interface ToggleButtonProps {
  status: boolean
  onAdd: () => void
  onRemove: () => void
  addLabel: string
  removeLabel: string
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  status,
  onAdd,
  onRemove,
  addLabel,
  removeLabel,
}) =>
  !status ? (
    <Button color="primary" onClick={onAdd}>
      {addLabel}
    </Button>
  ) : (
    <Button onClick={onRemove}>{removeLabel}</Button>
  )
