import Grid from '@mui/material/Grid'
import {useAtom} from 'jotai';

import './FretBoardView.css';
import {FretView} from './FretView';
import {StringView} from './StringView';
import {directionAtom} from '../../atoms';
import {FretBoardLabelModel, GuitarPositionModel} from "../../models";
import {useFretBoardLabels, useGuitarPositions} from "../../hooks";

export interface FretBoardViewProps {
}

export const FretBoardView = (props: FretBoardViewProps) => {
  const [direction] = useAtom(directionAtom)

  const columns = direction === 'vertical' ? 13 : 18
  const width = direction === 'vertical' ? '250px' : '100%'

  const fretLabels: FretBoardLabelModel[] = useFretBoardLabels()
  const fretActions: GuitarPositionModel[] = useGuitarPositions()

  const fretLabel = fretLabelBuilder(fretLabels)

  const frets = () => {
    if (direction === 'vertical') {
      return Array.from(Array(18).keys()).map((fret: number) => <FretView key={'' + fret} number={fret} fretLabels={fretLabel} fretActions={fretActions}></FretView>)
    } else {
      return Array.from(Array(7).keys()).map((index: number) => <StringView key={'' + index} index={index} fretLabels={fretLabel} fretActions={fretActions}></StringView>)
    }
  }

  return (
    <div style={{width}}>
      <Grid container columns={{ xs: columns }} alignItems="center">
        {frets()}
      </Grid>
    </div>
  );
}

export const fretLabelBuilder = (fretLabels: FretBoardLabelModel[] = []) => {
  return (fretIndex: number, stringIndex: number) => {
    const matches = fretLabels.filter(label => label.fretIndex === fretIndex && label.stringIndex === stringIndex)

    return matches.length > 0 ? matches[0].label || NBSP : NBSP;
  }
}

const NBSP = (<>&nbsp;</>)
