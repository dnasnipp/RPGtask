import React from 'react';

import '../form/Input.scss';
import './Bar.scss';

type BarProps = {
    currentValue: number;
    maxValue: number;
    color: string;
}

const Bar: React.FC<BarProps> = ({currentValue, maxValue, color}) => {
    return <div className="bar input">
        <div className="bar__current" style={{width: `${currentValue/maxValue * 100}%`, backgroundColor: color}}></div>
        <div className="bar__text">
            {`${currentValue}/${maxValue}`}
        </div>
    </div>
}

export default Bar;