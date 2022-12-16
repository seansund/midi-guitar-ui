import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {guitarKeysAtom} from "../atoms";
import {KeyModel} from '../models';
import {FretBoardConfigApi, getFretBoardConfigApi} from '../services';

const service: FretBoardConfigApi = getFretBoardConfigApi();

export const useGuitarKeys = (): KeyModel[] => {
  const [keys, setGuitarKeys] = useAtom(guitarKeysAtom);

  useEffect(() => {
    const subscription = service.getAvailableKeys().subscribe(setGuitarKeys);

    return () => {
      subscription.unsubscribe()
    }
  })

  return keys
}
