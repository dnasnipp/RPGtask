import React, {ChangeEvent} from 'react';

import '../Input.scss';

type InputProps = {
    onChange?: (event: React.ChangeEvent) => void;
    value?: string;
    placeholder?: string
}

const TextInput: React.FC<InputProps> = ({onChange, value, placeholder}) => {
    return <input
        className={"input"}
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
    />
}

export default TextInput;