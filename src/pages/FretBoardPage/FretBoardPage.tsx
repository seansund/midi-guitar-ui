import React from "react";
import {useAtom} from "jotai";
import {Grid} from "@mui/material";

import {
    ChordView,
    FretBoardDirectionToggle,
    FretBoardView,
    GuitarKeyControl,
    ModeControl,
    TextEditor
} from "../../components";

import {fretBoardModeAtom, fretBoardModesAtom, guitarKeyAtom, guitarKeysAtom} from "../../atoms";

export interface FretBoardPageProps {}

export const FretBoardPage = (props: FretBoardPageProps) => {
    const [mode] = useAtom(fretBoardModeAtom);
    const [key] = useAtom(guitarKeyAtom);

    const [modes] = useAtom(fretBoardModesAtom);
    const [keys] = useAtom(guitarKeysAtom);

    return (
        <div style={{padding: '10px'}}>
            <Grid container columns={{ xs: 3 }} alignItems="center" style={{paddingBottom: '10px'}}>
                <Grid item xs={1}>
                    <ModeControl mode={mode} modes={modes}></ModeControl>
                </Grid>
                <Grid item xs={1}>
                    <FretBoardDirectionToggle></FretBoardDirectionToggle>
                </Grid>
                <Grid item xs={1}>
                    <GuitarKeyControl guitarKey={key} guitarKeys={keys} disabled={mode === 'notes'}></GuitarKeyControl>
                </Grid>
            </Grid>
            <FretBoardView></FretBoardView>
            <ChordView></ChordView>
            <TextEditor></TextEditor>
        </div>
    )
}