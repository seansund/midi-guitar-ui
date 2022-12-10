import Grid from '@mui/material/Grid';

import {fretLabelBuilder, fretMarker} from '../FretView';
import {FretBoardAction, FretBoardLabel} from '../../../models';
import {useFretLabels} from '../../../hooks/fret-labels.hook';
import {useFretActions} from '../../../hooks/fret-actions.hook';

export interface StringViewProps {
  index: number;
  key: string;
}

export const StringView = (props: StringViewProps) => {
  const stringIndex = props.index;

  const fretLabels: FretBoardLabel[] = useFretLabels();
  const fretActions: FretBoardAction[] = useFretActions();

  const fretLabel = fretLabelBuilder(fretLabels)
  const fretClassNames = fretClassNamesBuilder(fretActions, stringIndex)

  const strings = () => {
    if (stringIndex === 6) {
      return Array.from(Array(18).keys())
        .map((fretIndex: number) => <Grid item xs={1}>{fretMarker(fretIndex)}</Grid>)
    } else {
      return Array.from(Array(18).keys())
        .map((fretIndex: number) => <Grid className={fretClassNames(fretIndex)} item xs={1}>{fretLabel(fretIndex, stringIndex)}</Grid>)
    }
  }

  return (
    <>
      {strings()}
    </>
  )
}

const fretClassNamesBuilder = (fretActions: FretBoardAction[], stringIndex: number) => {
  return (fretIndex: number): string => {
    const classNames: string[] = ['fret-horizontal']

    if (fretIndex === 0) {
      classNames.push('fret-horizontal-open')
    }

    const match = fretActions.filter(action => action.fretIndex === fretIndex && action.stringIndex === stringIndex)
    if (match.length > 0) {
      classNames.push('fret-active')
    }

    return classNames.join(' ')
  }
}
