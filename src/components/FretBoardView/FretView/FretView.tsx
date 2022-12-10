import {Component} from 'react';
import Grid from '@mui/material/Grid';

import './Fret.css';
import {FretBoardState} from '../../../state';

export interface FretProps {
  number: number;
  key: string;
}

export class FretView extends Component<FretProps, FretBoardState> {

  props: FretProps;

  constructor(props: FretProps) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <>
        <Grid item xs={1}>{ fretMarker(this.props.number) }</Grid>
        <Grid className={fretClassNames(this.props.number)} item xs={2}>{this.props.number}</Grid>
        <Grid className={fretClassNames(this.props.number)} item xs={2}>{this.props.number}</Grid>
        <Grid className={fretClassNames(this.props.number)} item xs={2}>{this.props.number}</Grid>
        <Grid className={fretClassNames(this.props.number)} item xs={2}>{this.props.number}</Grid>
        <Grid className={fretClassNames(this.props.number)} item xs={2}>{this.props.number}</Grid>
        <Grid className={fretClassNames(this.props.number)} item xs={2}>{this.props.number}</Grid>
      </>
    )
  }
}

export const fretClassNames = (index: number): string => {
  if (index === 0) {
    return 'fret-vertical fret-vertical-open'
  }

  return 'fret-vertical'
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
