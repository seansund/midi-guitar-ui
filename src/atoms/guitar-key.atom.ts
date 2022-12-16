import {atom} from 'jotai';

import {KeyModel} from '../models';
import {defaultKey} from "../services";

export const guitarKeyAtom = atom<KeyModel>(defaultKey)
