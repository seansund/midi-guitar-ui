import Grid from '@mui/material/Grid';

import {GuitarPositionModel, FretBoardLabelModel} from '../../../models';
import {useFretBoardLabels, useGuitarPositions} from '../../../hooks';

export interface FretViewProps {
  number: number;
  key: string;
  fretLabels: (fretIndex: number, stringIndex: number) => any
  fretActions: GuitarPositionModel[];
}

export const FretView = (props: FretViewProps) => {
  const fretIndex = props.number

  const fretLabel = props.fretLabels
  const fretClassNames = fretClassNamesBuilder(props.fretActions, fretIndex)

  return (
    <>
      <Grid item xs={1}>{ fretMarker(fretIndex) }</Grid>
      <Grid className={fretClassNames(5)} item xs={2}>{fretLabel(fretIndex, 5)}</Grid>
      <Grid className={fretClassNames(4)} item xs={2}>{fretLabel(fretIndex, 4)}</Grid>
      <Grid className={fretClassNames(3)} item xs={2}>{fretLabel(fretIndex, 3)}</Grid>
      <Grid className={fretClassNames(2)} item xs={2}>{fretLabel(fretIndex, 2)}</Grid>
      <Grid className={fretClassNames(1)} item xs={2}>{fretLabel(fretIndex, 1)}</Grid>
      <Grid className={fretClassNames(0)} item xs={2}>{fretLabel(fretIndex, 0)}</Grid>
    </>
  )
}

const fretClassNamesBuilder = (actions: GuitarPositionModel[], fretIndex: number) => {
  return (stringIndex: number): string => {
    const classNames: string[] = ['fret-vertical']

    if (fretIndex === 0) {
      classNames.push('fret-vertical-open')
    }

    const match = actions.filter(action => action.fretIndex === fretIndex && action.stringIndex === stringIndex)
    if (match.length > 0) {
      classNames.push('fret-active')
    }

    return classNames.join(' ')
  }
}

export const fretMarker = (fret: number): string => {
  switch(fret) {
    case 5:
    case 9:
    case 15:
      return "*"
    case 12:
      return "**"
    default:
      return ""
  }
}
