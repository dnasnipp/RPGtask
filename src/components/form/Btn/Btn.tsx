import React from "react";

import './Btn.scss';

type BtnProps = {
    children: string;
    onClick?: () => void;
    href?: string;
    needToBeLink?: boolean;
}

type BtnState = {}


// Классовый потому, что надо делать ref на него
class Btn extends React.Component<BtnProps, BtnState> {
    protected btnClick(e: React.MouseEvent): void {
        if (!this.props.needToBeLink) e.preventDefault();
        if (typeof this.props.onClick !== "undefined") this.props.onClick();
    }

    public constructor(props: BtnProps) {
        super(props);
        this.btnClick = this.btnClick.bind(this);
    }

    public render() {
        return <a
            href={this.props.href}
            className="btn"
            onClick={this.btnClick}
        >
            {this.props.children}
        </a>;
    }
}

export default Btn;