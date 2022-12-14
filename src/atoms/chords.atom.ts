import {atom} from 'jotai';
import {ChordModel} from '../models';

export const chordsAtom = atom<ChordModel[]>([])
