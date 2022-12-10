import {atom} from 'jotai';
import {Chord} from '../models';

export const chordsAtom = atom<Chord[]>([])
