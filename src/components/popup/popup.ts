import { useEffect, useState } from "react";
import "./popup.less";

import classnames from "classnames";

import { getPrefixNs } from "../../global/util";

import { PopupProps } from "./popup.types";

let popup: HTMLDivElement;
let overlay: HTMLElement;

function getVisualStates(props: PopupProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("popup", customizePrefixCls);

    const visualStates = classnames(prefixCls);

    return visualStates;
}

function getOverlayVisualStates(props: PopupProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("overlay", customizePrefixCls);

    const visualStates = classnames(prefixCls);

    return visualStates;
}

function showPopup() {
    popup !== undefined && (popup.style.display = "block");
}

function hidePopup() {
    popup !== undefined && (popup.style.display = "none");
}

function showOverlay() {
    overlay !== undefined && (overlay.style.display = "block");
    showPopup();
}

function hideOverlay() {
    overlay !== undefined && (overlay.style.display = "none");
    hidePopup();
}

function createOverlay(props?: PopupProps) {
    const overlayName = getOverlayVisualStates({
        ...props,
    });

    overlay = document.createElement("div");
    overlay.className = overlayName;
    overlay.dataset.testid = "litten-overlay";

    return overlay;
}

function createPopup(props?: PopupProps) {
    const containerName = getVisualStates({
        ...props,
    });

    popup = document.createElement("div");
    popup.className = containerName;
    popup.dataset.testid = "litten-popup";
    popup.append(createOverlay(props));
    document.body.append(popup);

    return popup;
}

export function usePopup(props: PopupProps) {
    const { opened, hasOverlay } = props;

    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (popup !== undefined) {
            setContainer(popup);
        } else {
            setContainer(createPopup());
        }
    }, []);

    useEffect(() => {
        if (opened === true) {
            showPopup();
        } else {
            hidePopup();
        }
    }, [opened]);

    useEffect(() => {
        if (hasOverlay === true) {
            showOverlay();
        } else {
            hideOverlay();
        }
    }, [hasOverlay]);

    return [container];
}
