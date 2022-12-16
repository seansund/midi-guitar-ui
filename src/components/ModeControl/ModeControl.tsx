import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {FretBoardModeModel} from "../../models";
import {FretBoardConfigApi, getFretBoardConfigApi} from "../../services";

export interface ModeControlProps {
    mode: FretBoardModeModel
    modes: FretBoardModeModel[]
}

export const ModeControl = (props: ModeControlProps) => {
    const service: FretBoardConfigApi = getFretBoardConfigApi();

    const setModeFromValue = (e: any) => {
        const value = e.target.value

        const newMode = getMode(props.modes, value)

        service.setMode(newMode)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="fret-board-mode-label">Mode</InputLabel>
            <Select
                labelId="fret-board-mode-label"
                id="fret-board-mode"
                value={props.mode.mode}
                label="Mode"
                onChange={setModeFromValue}
            >
                {props.modes.map(mode => <MenuItem key={mode.mode} value={mode.mode}>{mode.label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const getMode = (modes: FretBoardModeModel[], mode: string): FretBoardModeModel => {
    const result: FretBoardModeModel[] = modes.filter(m => m.mode === mode)

    if (result.length === 0) {
        throw new Error('Mode not found: ' + mode)
    }

    return result[0]
}
