import "./listbox.less";

import { KeyboardEvent, useEffect, useState } from "react";

import { ExceptionBoundary } from "exception-boundary";
import { ControlType, MouseState } from "litten-hooks/dist/enum";
import {
    LittenItem,
    LittenItems,
    SelectedValue,
} from "litten-hooks/dist/control/userControl/userControl.types";
import { useCurrentValue } from "litten-hooks/dist/contentControl";
import { usePrevious } from "litten-hooks/dist/usePrevious";
import {
    getNextListFocusIndex,
    getLastSelectedIndex,
    useVirtualFocus,
} from "litten-hooks/dist/useVirtualFocus";
import isArray from "lodash/isArray";

import { ListContextProps, ListboxProps } from "./listbox.types";
import {
    ListContext,
    getListItem,
    getVisualStates,
    getNextMultiSelectedValue,
} from "./listboxBase";

export const Listbox = ({
    multiple,
    value,
    defaultValue,
    children,
    onChange,
    ...props
}: ListboxProps) => {
    const [listItems, setListItems] = useState<LittenItems>([]);

    const [activedescendant, setActivedescendant] = useState("");

    const [itemMouseState, setItemMouseState] = useState(MouseState.none);

    const [errorMsg, setErrorMsg] = useState<string | undefined>();

    useEffect(() => {
        const list: LittenItem[] = [];
        getListItem(list, children);
        // const uniqItems = uniqBy(list, "value");
        setListItems([...list]);
    }, [children]);

    const [currentValue, setCurrentValue] = useCurrentValue<
        HTMLUListElement,
        SelectedValue
    >({
        value,
        defaultValue,
        controlType: ControlType.Listbox,
        onChange,
    });

    // 受控时，listbox将要更新的值
    const [nextValue, setNextValue] = useState(currentValue);
    const prevNextValue = usePrevious(nextValue);

    const [focusIndex, focusValue, setFocusValue] = useVirtualFocus(listItems);

    const [context, setContext] = useState<ListContextProps>({
        multiple,
        selectedValue: currentValue,
        setSelectedValue,
        setActivedescendant,
        setItemMouseState,
        focusValue,
    });

    useEffect(() => {
        if (multiple === true) {
            !isArray(currentValue) &&
                setErrorMsg(
                    "listbox value or defaultValue must be a sting[].when multiple is true."
                );
        }
    }, [currentValue, multiple]);

    useEffect(() => {
        if (prevNextValue !== nextValue) {
            value !== undefined &&
                onChange?.({
                    value: nextValue,
                    controlType: ControlType.Listbox,
                });
        }
    });

    useEffect(() => {
        setContext((prev) => {
            return {
                ...prev,
                selectedValue: currentValue,
                focusValue,
            };
        });
    }, [currentValue, focusValue]);

    function setSelectedValue(itemValue: string) {
        if (multiple === true) {
            let next: string[] | undefined;
            setCurrentValue((prev) => {
                next = getNextMultiSelectedValue(prev, itemValue);
                if (value === undefined) {
                    // 非受控
                    return next;
                } else {
                    // 受控
                    setNextValue(next);
                    return prev;
                }
            });
        } else {
            if (value === undefined) {
                // 非受控
                setCurrentValue(itemValue);
            } else {
                // 受控
                onChange?.({
                    value: itemValue,
                    controlType: ControlType.Listbox,
                });
            }
        }
        setFocusValue(itemValue);
    }

    function handleListKeyDown(e: KeyboardEvent) {
        const { key } = e;

        const nextIndex = getNextListFocusIndex(focusIndex, listItems, key);
        const { value, disabled } = listItems[nextIndex];

        if (key === " ") {
            // 选中可选项
            disabled !== true && setSelectedValue(value as string);
        } else {
            // 操作键盘改变焦点
            setFocusValue(value);
        }
    }

    // list获取焦点时，将焦点设置成选中项，如果没有选中项，将焦点设置成第一项设置
    function handleListFocus() {
        if (itemMouseState !== MouseState.mousedown) {
            let index = getLastSelectedIndex(listItems, currentValue, multiple);
            index = index >= 0 ? index : 0;
            setFocusValue(listItems[index].value);
        }
    }

    return (
        <ExceptionBoundary errorMsg={errorMsg}>
            <ListContext.Provider value={context}>
                <ul
                    {...props}
                    aria-activedescendant={activedescendant}
                    className={getVisualStates(props)}
                    onKeyDown={handleListKeyDown}
                    tabIndex={0}
                    onFocus={handleListFocus}
                >
                    {children}
                </ul>
            </ListContext.Provider>
        </ExceptionBoundary>
    );
};

Listbox.displayName = ControlType.Listbox;
