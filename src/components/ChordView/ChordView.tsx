import {useAtom} from "jotai";

import {chordsAtom} from "@/atoms";

import styles from './page.module.css'

export const ChordView = () => {
  const [chords] = useAtom(chordsAtom)

  const chord = chords.chords.map(c => c.label).join(', ')

  return (
    <div className={styles.chord}>&nbsp;{chord}&nbsp;</div>
  )
}
