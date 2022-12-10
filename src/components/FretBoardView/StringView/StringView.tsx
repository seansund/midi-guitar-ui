import {Component} from 'react';
import Grid from '@mui/material/Grid';

import './String.css'
import {fretMarker} from '../FretView';
import {FretBoardState} from '../../../state';

export interface StringProps {
  index: number;
  key: string;
}

export class StringView extends Component<StringProps, FretBoardState> {

  props: StringProps;

  constructor(props: StringProps) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <>
        {this.strings()}
      </>
    )
  }

  strings() {
    if (this.props.index === 6) {
      return Array.from(Array(18).keys()).map((index: number) => <Grid item xs={1}>{fretMarker(index)}</Grid>)
    } else {
      return Array.from(Array(18).keys()).map((index: number) => <Grid className={fretClassNames(index)} item xs={1}>{index}</Grid>)
    }
  }
}

const fretClassNames = (index: number): string => {
  if (index === 0) {
    return 'fret-horizontal fret-horizontal-open'
  }

  return 'fret-horizontal'
}