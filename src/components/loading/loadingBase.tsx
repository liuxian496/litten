import classnames from "classnames";

import { getPrefixNs } from "../../global/util";

import { LoadingProps } from "./loading.types";

function getCirclesVisualStates(props: LoadingProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("loading", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}--circle`);

    return visualStates;
}

export const CircleProgressIcon = (props: LoadingProps) => {
    return (
        <svg viewBox="22 22 44 44">
            <circle
                className={getCirclesVisualStates(props)}
                cx="44"
                cy="44"
                r="20.2"
                fill="none"
                strokeWidth="3.6"
            ></circle>
        </svg>
    );
};

export function getVisualStates(props: LoadingProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("loading", customizePrefixCls);

    const visualStates = classnames(prefixCls);

    return visualStates;
}

export function getProgressVisualStates(props: LoadingProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("loading", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}--progress`);

    return visualStates;
}
