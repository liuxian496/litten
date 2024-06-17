import { Children, ReactNode, createContext } from "react";

import classnames from "classnames";
import {
    LittenItems,
    SelectedValue,
} from "litten-hooks/dist/control/userControl/userControl.types";
import { ControlType } from "litten-hooks";
import isArray from "lodash/isArray";

import { getPrefixNs } from "../../global/util";

import { ListContextProps, ListboxProps } from "./listbox.types";

export const ListContext = createContext<ListContextProps | undefined>(
    undefined
);

export function getVisualStates(props: ListboxProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("listbox", customizePrefixCls);

    const visualStates = classnames(prefixCls);

    return visualStates;
}

export function getListItem(list: LittenItems, children: ReactNode) {
    // 遍历所有的ListItem和所有listGrroup下的ListItem
    Children.forEach(children, (child) => {
        if (child) {
            const item = child as JSX.Element;
            const { props, type: Component } = item;
            const { displayName } = Component;
            if (displayName === ControlType.ListItem ) {
                const { value, disabled, label } = props;
                list.push({
                    disabled,
                    label,
                    value,
                });
            } else if (displayName === ControlType.ListGroup) {
                const { children: itemChildren } = props;
                getListItem(list, itemChildren);
            }
        }
    });
}

/**
 * 多选模式下，根据待更改的listItem的值，获取更新之后的listbox选中值
 * @param prev listbox之前的选中值
 * @param itemValue 待更改的listItem的值
 * @returns 增加或删除后的新数组（数组引用会改变）
 */
export function getNextMultiSelectedValue(
    prev: SelectedValue | undefined,
    itemValue: string
) {
    if (isArray(prev)) {
        const selectedValues = [...prev];

        const itemValueIndex = selectedValues.findIndex(
            (item) => item === itemValue
        );

        if (itemValueIndex == -1) {
            // add
            return [...selectedValues, itemValue];
        } else {
            // delete
            selectedValues.splice(itemValueIndex, 1);
            return [...selectedValues];
        }
    }
}
