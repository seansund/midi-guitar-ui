import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {KeyModel} from "@/models";
import {FretBoardConfigApi, getFretBoardConfigApi} from "@/services";

export interface GuitarKeyControlProps {
    guitarKey: string
    guitarKeys: KeyModel[]
    disabled?: boolean
}

export const GuitarKeyControl = (props: GuitarKeyControlProps) => {
    const service: FretBoardConfigApi = getFretBoardConfigApi()

    const keys = props.guitarKeys || []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setKeyFromValue = (e: any) => {
        const value: string = e.target.value

        console.log('Guitar key change: ' + value)

        service.setKey(value).subscribe({
            next: val => console.log('Guitar key result: ', val),
            error: err => console.log('Error setting guitar key: ', err)
        })
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="guitar-key-label">Key</InputLabel>
            <Select
                labelId="guitar-key-label"
                id="guitar-key"
                value={props.guitarKey}
                label="Key"
                disabled={props.disabled}
                onChange={setKeyFromValue}
            >
                {keys.map(key => <MenuItem key={key.key} value={key.key}>{key.label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}
