import {atom} from 'jotai';

export enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

export const directionAtom = atom<Direction>(Direction.horizontal)
