import {useAtom} from "jotai";
import {TextareaAutosize} from "@mui/material";
import {keyPressedAtom} from "@/atoms";

export const TextEditor = () => {
    const [text] = useAtom(keyPressedAtom)

    return (
        <div style={{width: '100%'}}>
            <TextareaAutosize value={text} readOnly={true}></TextareaAutosize>
        </div>
    )
}
