import React from 'react';
import './summary.less';

import classnames from 'classnames';

import { SummaryProps } from './summary.types';
import { getPrefixNs } from '../control/control';
import { Color } from '../../global/enum';
import { getI18NConfig } from '../../global/local';
import { NoteIcon, WarningIcon, DeepIcon } from '../icon/icon';

function getVisualStates(props: SummaryProps) {
    const {
        prefixCls: customizePrefixCls,
        color,
    } = props;
    const prefixCls = getPrefixNs('summary', customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${color}`,
    );

    return visualStates;
}

function getTitleVisualStates(props: SummaryProps) {
    const {
        prefixCls: customizePrefixCls,
        color,
    } = props;

    const prefixCls = getPrefixNs('summary', customizePrefixCls);

    const visualStates = classnames(
        `${prefixCls}__title`,
        `${prefixCls}__title--${color}`,
    );

    return visualStates;
}

function getContentVisualStates(props: SummaryProps) {
    const {
        prefixCls: customizePrefixCls,
    } = props;

    const prefixCls = getPrefixNs('summary', customizePrefixCls);

    const visualStates = classnames(
        `${prefixCls}__content`,
    );

    return visualStates;
}

function getTitle(color?: Color) {
    const config = getI18NConfig();
    let title = ''
    switch (color) {
        case Color.note:
            title = config.note;
            break;
        case Color.warning:
            title = config.pitfall;
            break;
        case Color.deep:
            title = config.deep;
            break;
    }
    return title;
}

function getTitleIcon(props: SummaryProps) {
    const { color } = props;
    let icon;
    switch (color) {
        case Color.note:
            icon = <NoteIcon />;
            break;
        case Color.warning:
            icon = <WarningIcon />;
            break;
        case Color.deep:
            icon = <DeepIcon />
            break;
    }
    return icon;
}

export const Summary = (props: SummaryProps) => {
    const { children, color } = props;
    return (
        <div className={getVisualStates(props)}>
            <div className={getTitleVisualStates(props)}>
                {getTitleIcon(props)}
                {getTitle(color)}
            </div>
            <div className={getContentVisualStates(props)}>
                {children}
            </div>
        </div>
    )
}