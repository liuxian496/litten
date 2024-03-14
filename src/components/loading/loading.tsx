import { createPortal } from "react-dom";
import "./loading.less";

import { ControlType } from "../../global/enum";

import { usePopup } from "../popup/popup";

import { LoadingProps } from "./loading.types";
import {
    CircleProgressIcon,
    getProgressVisualStates,
    getVisualStates,
} from "./loadingBase";

export const Loading = (props: LoadingProps) => {
    const { opened } = props;

    const [popup] = usePopup({ opened: opened, hasOverlay: opened });

    return (
        opened &&
        popup &&
        createPortal(
            <div className={getVisualStates(props)}>
                <span
                    className={getProgressVisualStates(props)}
                    data-testid="litten-progress"
                >
                    <CircleProgressIcon {...props} />
                </span>
            </div>,
            popup
        )
    );
};

Loading.displayName = ControlType.Loading;
