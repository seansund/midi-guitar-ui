import {useEffect} from 'react';
import {Subscription} from "rxjs";
import {useAtom} from 'jotai';

import {fretBoardModeAtom, guitarKeyAtom} from "../atoms";
import {FretBoardConfigModel} from '../models';
import {FretBoardConfigApi, getFretBoardConfigApi} from '../services';

const service: FretBoardConfigApi = getFretBoardConfigApi();

let _subscription: Subscription | undefined;

export const useFretBoardConfig = (source: string): FretBoardConfigModel => {
  const [mode, setFretBoardMode] = useAtom(fretBoardModeAtom);
  const [key, setGuitarKey] = useAtom(guitarKeyAtom);

  useEffect(() => {
    if (_subscription) {
      return () => {
        if (_subscription) {
          _subscription.unsubscribe()
        }
        _subscription = undefined
      }
    }

    _subscription = service.config().subscribe((config: FretBoardConfigModel) => {
      setFretBoardMode(config.mode)
      setGuitarKey(config.key)
    });

    return () => {
      if (_subscription) {
        _subscription.unsubscribe()
      }
      _subscription = undefined
    }
  })

  return {mode, key}
}
