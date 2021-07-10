import React from 'react';

import '../Input.scss';

type InputProps = {
    onChange?: (newValue: string) => void;
    value?: string;
    placeholder?: string
}

const TextInput: React.FC<InputProps> = ({onChange, value, placeholder}) => {

    function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
        if(typeof onChange !== "undefined") onChange(e.target.value || '');
    }

    return <input
        className={"input"}
        type="text"
        onChange={changeValue}
        value={value}
        placeholder={placeholder}
    />
}

export default TextInput;