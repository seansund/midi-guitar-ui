import Grid from '@mui/material/Grid';

import {fretMarker} from '../FretView';
import {GuitarPositionModel} from '../../../models';

export interface StringViewProps {
  index: number;
  key: string;
  fretLabels: (fretIndex: number, stringIndex: number) => any;
  fretActions: GuitarPositionModel[];
}

export const StringView = (props: StringViewProps) => {
  const stringIndex = props.index;

  const fretLabel = props.fretLabels
  const fretClassNames = fretClassNamesBuilder(props.fretActions, stringIndex)

  const strings = () => {
    if (stringIndex === 6) {
      return Array.from(Array(18).keys())
        .map((fretIndex: number) => <Grid item key={`${stringIndex}-${fretIndex}`} xs={1}>{fretMarker(fretIndex)}</Grid>)
    } else {
      return Array.from(Array(18).keys())
        .map((fretIndex: number) => <Grid className={fretClassNames(fretIndex)} item key={`${stringIndex}-${fretIndex}`} xs={1}>{fretLabel(fretIndex, stringIndex)}</Grid>)
    }
  }

  return (
    <>
      {strings()}
    </>
  )
}

const fretClassNamesBuilder = (fretActions: GuitarPositionModel[], stringIndex: number) => {
  return (fretIndex: number): string => {
    const classNames: string[] = ['fret-horizontal']

    if (fretIndex === 0) {
      classNames.push('fret-horizontal-open')
    }

    const match = fretActions
        .filter(action => action && action.fretIndex === fretIndex && action.stringIndex === stringIndex)
    if (match.length > 0) {
      classNames.push('fret-active')
    }

    return classNames.join(' ')
  }
}
