import "./exceptionBoundary.less";

import classnames from "classnames";

import { getPrefixNs } from "../control/userControl";

import { ExceptionBoundaryProps } from "../exceptionBoundary/exceptionBoundary.types";
import { error } from "../../global/util";

function renderBoundary(props: ExceptionBoundaryProps) {
    const { errorMsg } = props;
    return (
        <div className={getExceptionVisualStates(props)}>{error(errorMsg)}</div>
    );
}

function getExceptionVisualStates(props: ExceptionBoundaryProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("exception", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__msg`);

    return visualStates;
}

export function ExceptionBoundary(props: ExceptionBoundaryProps) {
    const { children, errorMsg } = props;

    return (
        <>
            {errorMsg === undefined && children}
            {errorMsg !== undefined && renderBoundary(props)}
        </>
    );
}
