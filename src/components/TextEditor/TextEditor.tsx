import {keyPressedAtom} from "../../atoms";
import {useAtom} from "jotai";
import {TextareaAutosize} from "@mui/material";

export interface TextEditorProps {
}

export const TextEditor = (props: TextEditorProps) => {
    const [text] = useAtom(keyPressedAtom)

    return (
        <div style={{width: '100%'}}>
            <TextareaAutosize value={text} readOnly={true}></TextareaAutosize>
        </div>
    )
}
