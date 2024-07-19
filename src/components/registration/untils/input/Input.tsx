import React from 'react'
import { IInputProps } from '../types/IInputProps'
import stylesInput from '../styles/input.module.scss'

const Input: React.FC<IInputProps> = ({ type = 'text', placeholder = 'your name', trigger = '', setTrigger }) => {
    //---------------------------
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (setTrigger) {
            setTrigger(event.target.value);
        }
    };
    //---------------------------

    return (
        <>
            <div className={stylesInput.inputStyles}>
                <input value={trigger} onChange={handleChange} type={type} placeholder={placeholder} />
            </div>

        </>

    )
}

export default Input