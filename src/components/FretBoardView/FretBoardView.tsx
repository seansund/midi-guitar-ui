import {Component} from 'react';
import Grid from '@mui/material/Grid'

import { FretView } from './FretView';
import { StringView } from './StringView';
import {FretBoardState} from '../../state';

export interface FretBoardProps {
  direction?: 'vertical' | 'horizontal';
}

export class FretBoardView extends Component<FretBoardProps, FretBoardState> {

  props: FretBoardProps;

  constructor(props: FretBoardProps) {
    super(props);

    this.props = props;
  }

  render() {
    const direction = this.props.direction || 'vertical'
    const columns = direction === 'vertical' ? 13 : 18
    const width = direction === 'vertical' ? '200px' : '100%'

    return (
      <div style={{width}}>
        <Grid container columns={{ xs: columns }}>
          {this.frets()}
        </Grid>
      </div>
    );
  }

  frets() {
    if (this.props.direction === 'vertical') {
      return Array.from(Array(18).keys()).map((fret: number) => <FretView key={'' + fret} number={fret}></FretView>)
    } else {
      return Array.from(Array(7).keys()).map((index: number) => <StringView key={'' + index} index={index}></StringView>)
    }
  }
}
