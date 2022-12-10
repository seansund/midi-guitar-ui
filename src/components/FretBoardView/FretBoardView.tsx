import Grid from '@mui/material/Grid'
import {useAtom} from 'jotai';

import './FretBoardView.css';
import {FretView} from './FretView';
import {StringView} from './StringView';
import {directionAtom} from '../../atoms/direction.atom';

export interface FretBoardViewProps {
}

export const FretBoardView = (props: FretBoardViewProps) => {
  const [direction] = useAtom(directionAtom)

  const columns = direction === 'vertical' ? 13 : 18
  const width = direction === 'vertical' ? '250px' : '100%'

  const frets = () => {
    if (direction === 'vertical') {
      return Array.from(Array(18).keys()).map((fret: number) => <FretView key={'' + fret} number={fret}></FretView>)
    } else {
      return Array.from(Array(7).keys()).map((index: number) => <StringView key={'' + index} index={index}></StringView>)
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
