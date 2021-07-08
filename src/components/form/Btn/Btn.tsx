import React from "react";

import './Btn.scss';

type BtnProps = {
    children: string;
    onClick?: (event: React.MouseEvent) => void;
}

const Btn: React.FC<BtnProps> = ({onClick, children}) => {
    return <button className="btn" onClick={onClick}>{children}</button>
}

export default Btn;