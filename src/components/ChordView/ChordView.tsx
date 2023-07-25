import {useAtom} from "jotai";

import './ChordView.css';
import {chordsAtom} from "../../atoms";

export interface ChordViewProps {
}

export const ChordView = (props: ChordViewProps) => {
  const [chords] = useAtom(chordsAtom)

  const chord = chords.chords.map(c => c.label).join(', ')

  return (
    <div className={"chord"}>&nbsp;{chord}&nbsp;</div>
  )
}
