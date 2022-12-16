import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {KeyModel} from "../../models";
import {FretBoardConfigApi, getFretBoardConfigApi} from "../../services";

export interface GuitarKeyControlProps {
    guitarKey: KeyModel
    guitarKeys: KeyModel[]
    disabled?: boolean
}

export const GuitarKeyControl = (props: GuitarKeyControlProps) => {
    const service: FretBoardConfigApi = getFretBoardConfigApi()

    const setKeyFromValue = (e: any) => {
        const value = e.target.value

        const newKey = getKey(props.guitarKeys, value)

        service.setKey(newKey)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="guitar-key-label">Key</InputLabel>
            <Select
                labelId="guitar-key-label"
                id="guitar-key"
                value={props.guitarKey.key}
                label="Key"
                disabled={props.disabled}
                onChange={setKeyFromValue}
            >
                {props.guitarKeys.map(key => <MenuItem key={key.key} value={key.key}>{key.label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const getKey = (keys: KeyModel[], key: string): KeyModel => {
    const result: KeyModel[] = keys.filter(k => k.key === key)

    if (result.length === 0) {
        throw new Error('Key not found: ' + key)
    }

    return result[0]
}
