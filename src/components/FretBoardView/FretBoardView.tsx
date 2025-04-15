import Grid from '@mui/material/Grid'
import {useAtom} from 'jotai';

import './page.module.css';
import {FretView} from './FretView';
import {StringView} from './StringView';
import {directionAtom, fretBoardLabelsAtom, guitarPositionsAtom} from '@/atoms';
import {FretBoardLabelModel, GuitarPositionModel} from "@/models";
import {getGuitarEventsApi} from "@/services";

export const FretBoardView = () => {
  const [direction] = useAtom(directionAtom)

  const columns = direction === 'vertical' ? 13 : 18
  const width = direction === 'vertical' ? '250px' : '100%'

  const [fretBoardLabels] = useAtom(fretBoardLabelsAtom)
  const fretLabels: FretBoardLabelModel[] = fretBoardLabels.labels

  const [guitarPositions] = useAtom(guitarPositionsAtom)
  const fretActions: GuitarPositionModel[] = guitarPositions.positions;

  const fretLabel = fretLabelBuilder(fretLabels)

  const frets = () => {
    if (direction === 'vertical') {
      return Array.from(Array(18).keys()).map((fret: number) => <FretView key={'' + fret} number={fret} fretLabels={fretLabel} fretActions={fretActions} />)
    } else {
      return Array.from(Array(7).keys()).map((index: number) => <StringView key={'' + index} index={index} fretLabels={fretLabel} fretActions={fretActions} />)
    }
  }

  return (
    <div style={{width, margin: 'auto'}}>
      <Grid container columns={{ xs: columns }} alignItems="center">
        {frets()}
      </Grid>
    </div>
  );
}

export const fretLabelBuilder = (fretLabels: FretBoardLabelModel[] = []) => {
  const service = getGuitarEventsApi();

  const fretLabel = ({fretIndex, stringIndex}: {fretIndex: number, stringIndex: number}) => {
    const matches = fretLabels.filter(label => label.fretIndex === fretIndex && label.stringIndex === stringIndex)

    if (matches.length === 0) {
      return NBSP;
    }

    return matches[0].label ? <div onClick={() => service.pressNote({fretIndex, stringIndex})}>{matches[0].label}</div> : NBSP;
  }
  return fretLabel;
}

const NBSP = (<>&nbsp;</>)
