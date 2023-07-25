import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useAtom} from 'jotai';
import {directionAtom} from '../../atoms/direction.atom';

export interface FretBoardDirectionToggleProps {

}

export const FretBoardDirectionToggle = (props: FretBoardDirectionToggleProps) => {
  const [direction, setDirection] = useAtom(directionAtom)

  const handleChange = (e: any) => {
    setDirection(e.target.value)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={direction}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="horizontal">Horizontal</ToggleButton>
      <ToggleButton value="vertical">Vertical</ToggleButton>
    </ToggleButtonGroup>
  )
}