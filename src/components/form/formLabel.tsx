import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './formLabel.less';

import { FormLabelProps } from './form.types';
import { getPrefixNs } from '../control/control';
import classnames from 'classnames';
import { MouseState, Placement } from '../../global/enum';

export let littenLabeMouseState = MouseState.none;

/**
 * 设置labeMouseState
 * @param state 待设置的MouseState {MouseState}
 */
export function setLabeMouseState(state: MouseState) {
    littenLabeMouseState = state;
}

function getVisualStates(props: FormLabelProps) {
    const {
        prefixCls: customizePrefixCls,
        labelPlacement,
        disabled
    } = props;

    const prefixCls = getPrefixNs('formLabel', customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${labelPlacement}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        }
    );

    return visualStates;
}

function renderLabel(props: FormLabelProps) {
    const { label } = props;

    return (
        <>
            {label}
        </>
    )
}

export const FormLabel = ({
    labelPlacement = Placement.left,
    ...props
}: FormLabelProps) => {
    const { children } = props;

    function handleLabelMouseUp() {
        littenLabeMouseState = MouseState.mousedown;
    }
    return (
        <label
            {...props}
            className={getVisualStates({ labelPlacement, ...props })}
            onMouseUp={handleLabelMouseUp}
        >
            {(labelPlacement === Placement.top || labelPlacement === Placement.left) && renderLabel(props)}
            {children}
            {(labelPlacement === Placement.bottom || labelPlacement === Placement.right) && renderLabel(props)}
        </label>
    );
}