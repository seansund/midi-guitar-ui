import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {Chord, Chords} from '../models';
import {ChordApi, getChordApi} from '../services';
import {chordsAtom} from '../atoms/chords.atom';

const service: ChordApi = getChordApi();

export const useChords = (): Chord[] => {
  const [chords, setChords] = useAtom(chordsAtom);

  useEffect(() => {
    const subscription = service.chord().subscribe((actions: Chords) => {
      setChords(actions.chords)
    });

    return () => {
      subscription.unsubscribe()
    }
  })

  return chords
}