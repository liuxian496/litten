import "./formLabel.less";

import classnames from "classnames";

import { MouseState, Placement, UserControlType } from "../../global/enum";
import { getPrefixNs } from "../control/control";

import { FormLabelProps } from "../formLabel/formLabel.types";
import { useDisabled } from "../control/disabledControl";

let littenLabeMouseState = MouseState.none;

export function gettLabeMouseState() {
    return littenLabeMouseState;
}

/**
 * 设置labeMouseState
 * @param state 待设置的MouseState {MouseState}
 */
export function setLabeMouseState(state: MouseState) {
    littenLabeMouseState = state;
}

function getVisualStates(props: FormLabelProps) {
    const { prefixCls: customizePrefixCls, labelPlacement, disabled } = props;

    const prefixCls = getPrefixNs("formLabel", customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${labelPlacement}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        }
    );

    return visualStates;
}

function getLabelVisualStates(props: FormLabelProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("formLabel", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__label`);

    return visualStates;
}

function renderLabel(props: FormLabelProps) {
    const { label } = props;

    return (
        <>
            <span className={getLabelVisualStates(props)}>{label}</span>
        </>
    );
}

export const FormLabel = ({
    labelPlacement = Placement.left,
    disabled: disabledProp = false,
    loading = false,
    ...props
}: FormLabelProps) => {
    const { children } = props;

    const disabled = useDisabled({ disabled: disabledProp, loading });

    function handleLabelMouseUp(e: React.MouseEvent<HTMLLabelElement>) {
        const target = e.target as HTMLElement;

        if (target.className === getLabelVisualStates(props)) {
            littenLabeMouseState = MouseState.mouseup;
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
                renderLabel(props)}
            {children}
            {(labelPlacement === Placement.bottom ||
                labelPlacement === Placement.right) &&
                renderLabel(props)}
        </label>
    );
};

FormLabel.displayName = UserControlType.FormLabel;
