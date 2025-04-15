import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useAtom} from 'jotai';
import {directionAtom} from '@/atoms';

export const FretBoardDirectionToggle = () => {
  const [direction, setDirection] = useAtom(directionAtom)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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