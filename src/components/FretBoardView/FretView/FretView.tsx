import Grid from '@mui/material/Grid';

import {GuitarPositionModel} from '@/models';

import styles from '../page.module.css';

export interface FretViewProps {
  number: number;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fretLabels: (props: {fretIndex: number, stringIndex: number}) => any
  fretActions: GuitarPositionModel[];
}

export const FretView = (props: FretViewProps) => {
  const fretIndex = props.number

  const fretLabel = (stringIndex: number) => {
    return props.fretLabels({fretIndex, stringIndex})
  }
  const fretClassNames = fretClassNamesBuilder(props.fretActions, fretIndex)

  const FretMarker = () => {
    return <Grid size={{ xs: 1 }}>{ fretMarker(fretIndex) }</Grid>
  }
  const Fret = ({stringIndex}: {stringIndex: number}) => {
    return <Grid size={{ xs: 2 }} className={fretClassNames(stringIndex)}>{fretLabel(stringIndex)}</Grid>
  }

  return (
    <>
      <FretMarker />
      <Fret stringIndex={5} />
      <Fret stringIndex={4} />
      <Fret stringIndex={3} />
      <Fret stringIndex={2} />
      <Fret stringIndex={1} />
      <Fret stringIndex={0} />
    </>
  )
}

const fretClassNamesBuilder = (actions: GuitarPositionModel[], fretIndex: number) => {
  return (stringIndex: number): string => {
    const classNames: string[] = [styles.fretVertical]

    if (fretIndex === 0) {
      classNames.push(styles.fretVerticalOpen)
    }

    const match = actions
        .filter(action => !!action)
        .filter(action => action.fretIndex === fretIndex && action.stringIndex === stringIndex)
    if (match.length > 0) {
      classNames.push(styles.fretActive)
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
