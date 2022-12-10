import Grid from '@mui/material/Grid';

import {FretBoardAction, FretBoardLabel} from '../../../models';
import {useFretLabels} from '../../../hooks/fret-labels.hook';
import {useFretActions} from '../../../hooks/fret-actions.hook';

export interface FretViewProps {
  number: number;
  key: string;
}

export const FretView = (props: FretViewProps) => {
  const fretIndex = props.number
  const fretLabels: FretBoardLabel[] = useFretLabels();
  const fretActions: FretBoardAction[] = useFretActions();

  const fretLabel = fretLabelBuilder(fretLabels)
  const fretClassNames = fretClassNamesBuilder(fretActions, fretIndex)

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

const fretClassNamesBuilder = (actions: FretBoardAction[], fretIndex: number) => {
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

export const fretLabelBuilder = (fretLabels: FretBoardLabel[] = []) => {
  return (fretIndex: number, stringIndex: number): string => {
    const matches = fretLabels.filter(label => label.fretIndex === fretIndex && label.stringIndex === stringIndex)

    return matches.length > 0 ? matches[0].label : '';
  }
}
