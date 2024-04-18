import "./formLabel.less";

import classnames from "classnames";

import { MouseState, Placement, ControlType } from "../../global/enum";
import { getPrefixNs, setLabelMouseState } from "../control/userControl";

import { FormLabelProps } from "../formLabel/formLabel.types";
import { useDisabled } from "../control/disabledControl";

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
