import React from 'react';

import './ClickInput.scss';
import '../Input.scss';

type ClickInputProps = {
    value?: number;
    step?: number;
    minValue?: number;
    maxValue?: number;
    onChangeValue?: (value: number) => void
}

const ClickInput: React.FC<ClickInputProps> = ({value = 0 , step = 1, minValue, maxValue, onChangeValue}) => {

    function changeValue(newValue: number): void {
        if(typeof onChangeValue === "undefined") return;

        let correctedValue: number = newValue;

        if(typeof minValue !== "undefined" && correctedValue < minValue) correctedValue = minValue;
        if(typeof maxValue !== "undefined" && correctedValue > maxValue) correctedValue = maxValue;

        onChangeValue(correctedValue);
    }

    return (
        <div className="click-input">
            <div className="click-input__decrease" onClick={changeValue.bind(null, value-step)}></div>
            <div className="input click-input__value">{value}</div>
            <div className="click-input__increase" onClick={changeValue.bind(null, value+step)}></div>
        </div>
    )
}

export default ClickInput;