"use client"

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
} from "../components";

import {fretBoardModeAtom, fretBoardModesAtom, guitarKeyAtom, guitarKeysAtom} from "../atoms";

const FretBoardPage = () => {
  const [mode] = useAtom(fretBoardModeAtom);
  const [key] = useAtom(guitarKeyAtom);

  const [modes] = useAtom(fretBoardModesAtom);
  const [keys] = useAtom(guitarKeysAtom);

  return (
      <div style={{padding: '10px'}}>
        <Grid container columns={{ xs: 3 }} alignItems="center" style={{paddingBottom: '10px'}}>
          <Grid size={{ xs: 1 }}>
            <ModeControl mode={mode} modes={modes}></ModeControl>
          </Grid>
          <Grid size={{ xs: 1 }} style={{textAlign: 'center'}}>
            <FretBoardDirectionToggle></FretBoardDirectionToggle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <GuitarKeyControl guitarKey={key} guitarKeys={keys} disabled={mode === 'notes'}></GuitarKeyControl>
          </Grid>
        </Grid>
        <FretBoardView />
        <ChordView />
        <TextEditor />
      </div>
  )
}

export default FretBoardPage;

