import Grid from '@mui/material/Grid';

import {GuitarPositionModel} from '@/models';

import styles from '../page.module.css';
import {fretMarker} from '../FretView';

export interface StringViewProps {
  index: number;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fretLabels: (props: {fretIndex: number, stringIndex: number}) => any;
  fretActions: GuitarPositionModel[];
}

export const StringView = (props: StringViewProps) => {
  const stringIndex = props.index;

  const fretLabel = props.fretLabels
  const fretClassNames = fretClassNamesBuilder(props.fretActions, stringIndex)

  const strings = () => {
    if (stringIndex === 6) {
      return Array.from(Array(18).keys())
        .map((fretIndex: number) => <Grid key={`${stringIndex}-${fretIndex}`} size={{ xs: 1 }}>{fretMarker(fretIndex)}</Grid>)
    } else {
      return Array.from(Array(18).keys())
        .map((fretIndex: number) => <Grid className={fretClassNames(fretIndex)} key={`${stringIndex}-${fretIndex}`} size={{ xs: 1 }}>{fretLabel({fretIndex, stringIndex})}</Grid>)
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
    const classNames: string[] = [styles.fretHorizontal]

    if (fretIndex === 0) {
      classNames.push(styles.fretHorizontalOpen)
    }

    const match = fretActions
        .filter(action => action && action.fretIndex === fretIndex && action.stringIndex === stringIndex)
    if (match.length > 0) {
      classNames.push(styles.fretActive)
    }

    return classNames.join(' ')
  }
}
