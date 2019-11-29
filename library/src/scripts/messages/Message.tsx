/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import classNames from "classnames";
import { t } from "@library/utility/appUtils";
import { LiveMessage } from "react-aria-live";
import { messagesClasses } from "@library/messages/messageStyles";
import Button from "@library/forms/Button";
import Container from "@library/layout/components/Container";
import { ButtonTypes } from "@library/forms/buttonStyles";
import ButtonLoader from "@library/loaders/ButtonLoader";

export interface IMessageProps {
    className?: string;
    contents?: React.ReactNode;
    stringContents: string;
    clearOnUnmount?: boolean; // reannounces the message if the page gets rerendered. This is an important message, so we want this by default.
    onConfirm?: () => void;
    confirmText?: React.ReactNode;
    onCancel?: () => void;
    cancelText?: React.ReactNode;
    isFixed?: boolean;
    isContained?: boolean;
    title?: string;
    isActionLoading?: boolean;
    noIcon?: boolean;
}

export default function Message(props: IMessageProps) {
    const classes = messagesClasses();

    // When fixed we need to apply an extra layer for padding.
    const InnerWrapper = props.isContained ? Container : React.Fragment;
    const OuterWrapper = props.isFixed ? Container : React.Fragment;

    const contents = props.contents || props.stringContents;

    return (
        <>
            <div className={classNames(classes.root, props.className, { [classes.fixed]: props.isFixed })}>
                <OuterWrapper>
                    <div
                        className={classNames(classes.wrap(props.noIcon), props.className, {
                            [classes.noPadding]: props.isContained,
                            [classes.fixed]: props.isContained,
                        })}
                    >
                        <InnerWrapper className={classes.innerWrapper}>
                            <div className={classes.message}>
                                {props.title && <h2 className={classes.title}>{props.title}</h2>}
                                {contents && <p className={classes.text}>{contents}</p>}
                            </div>

                            {props.onConfirm && (
                                <Button
                                    baseClass={ButtonTypes.TEXT_PRIMARY}
                                    onClick={props.onConfirm}
                                    className={classes.actionButton}
                                    disabled={!!props.isActionLoading}
                                >
                                    {props.isActionLoading ? <ButtonLoader /> : props.confirmText || t("OK")}
                                </Button>
                            )}
                            {props.onCancel && (
                                <Button
                                    baseClass={ButtonTypes.TEXT}
                                    onClick={props.onCancel}
                                    className={classes.actionButton}
                                    disabled={!!props.isActionLoading}
                                >
                                    {props.isActionLoading ? <ButtonLoader /> : props.cancelText || t("Cancel")}
                                </Button>
                            )}
                        </InnerWrapper>
                    </div>
                </OuterWrapper>
            </div>
            {/* Does not visually render, but sends message to screen reader users*/}
            <LiveMessage clearOnUnmount={!!props.clearOnUnmount} message={props.stringContents} aria-live="assertive" />
        </>
    );
}
