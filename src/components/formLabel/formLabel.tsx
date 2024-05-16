import "./formLabel.less";

import { useDisabled } from "litten-hooks/dist/disabledControl";
import { ControlType, MouseState, Placement } from "litten-hooks/dist/enum";

import {
    getLabelVisualStates,
    getVisualStates,
    setLabelMouseState,
} from "./formLabelBase";
import { FormLabelProps } from "../formLabel/formLabel.types";

function renderLabel(props: FormLabelProps) {
    const { label, labelStyle } = props;

    return (
        <>
            <span style={labelStyle} className={getLabelVisualStates(props)}>
                {label}
            </span>
        </>
    );
}

export const FormLabel = ({
    labelPlacement = Placement.left,
    disabled: disabledProp = false,
    loading = false,
    labelStyle,
    ...props
}: FormLabelProps) => {
    const { children } = props;

    const disabled = useDisabled({ disabled: disabledProp, loading });

    function handleLabelMouseUp(e: React.MouseEvent<HTMLLabelElement>) {
        const target = e.target as HTMLElement;

        if (target.className === getLabelVisualStates(props)) {
            setLabelMouseState(MouseState.mouseup);
        }
    }

    return (
        <label
            {...props}
            className={getVisualStates({ labelPlacement, disabled, ...props })}
            onMouseUp={handleLabelMouseUp}
        >
            {(labelPlacement === Placement.top ||
                labelPlacement === Placement.left) &&
                renderLabel({ ...props, labelStyle })}
            {children}
            {(labelPlacement === Placement.bottom ||
                labelPlacement === Placement.right) &&
                renderLabel({ ...props, labelStyle })}
        </label>
    );
};

FormLabel.displayName = ControlType.FormLabel;
