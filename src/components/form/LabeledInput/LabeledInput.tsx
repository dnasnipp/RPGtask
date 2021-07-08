import React, {ReactElement} from 'react';

import './LabeledInput.scss';

type LabeledTextInputProps = {
    title: string;
    titleCenter?: boolean;
    invalid?: boolean;
    children: ReactElement;
}

const LabeledInput: React.FC<LabeledTextInputProps> = ({children, title, titleCenter,  invalid}) => {
    return (
        <div className="labeled-text-input">
            <label className="labeled-text-input__label">
                <div
                    className={`labeled-text-input__title ${invalid ? 'this--invalid': ''} ${titleCenter ? 'this--center': ''}`}
                >
                    {title}
                </div>
                <div className="labeled-text-input__input">
                    {children}
                </div>
            </label>
        </div>
    )
}

export default LabeledInput;