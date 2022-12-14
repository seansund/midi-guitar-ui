import './ChordView.css';
import {ChordModel} from '../../models';
import {useChords} from '../../hooks/chords.hook';

export interface ChordViewProps {
}

export const ChordView = (props: ChordViewProps) => {
  const chords: ChordModel[] = useChords()

  const chord = chords.map(c => c.label).join(', ')

  return (
    <div className={"chord"}>{chord}</div>
  )
}
