import { Dispatch, SetStateAction } from "react";

export interface IInputProps {
    type: string;
    placeholder: string;
    trigger?: string | number;
    setTrigger?: Dispatch<SetStateAction<string>>
}