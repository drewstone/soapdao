import React from 'react';
import { Button } from "@geist-ui/react";

const PrimaryButton = (props: PrimaryButtonProps): JSX.Element => {
    if (props.href) {
        return (
            <a href={props.href}>
                <div>
                    <ButtonWrapper {...props} />
                </div>
            </a>
        );
    } else if (props.url) {
        return (
            <a
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                style={{
                    lineHeight: props.manualWidth ? "0" : "initial",
                }}
            >
                <ButtonWrapper {...props} />
            </a>
        );
    } else {
        return <ButtonWrapper {...props} />;
    }
};

const ButtonWrapper = ({ manualWidth, ...props }: PrimaryButtonProps) => (
    <Button
        type="secondary"
        ghost
        shadow
        auto={!manualWidth}
        style={{
            width: manualWidth ? "100%" : "auto",
        }}
        {...(props as any)}
    />
);

type PrimaryButtonProps = {
    size?: string;
    href?: string;
    onClick?: (e: any) => void;
    disabled?: boolean;
    as?: string;
    children?: React.ReactNode;
    loading?: boolean;
    type?: string;
    url?: string;
    manualWidth?: boolean;
    style?: Record<string, string>;
};

export default PrimaryButton;
