import "./listItem.less";

import { useContext, useEffect, useId, useRef, useState } from "react";

import { ControlType, FocusState, MouseState } from "litten-hooks/dist/enum";
import { useDisabled } from "litten-hooks/dist/disabledControl";
import isFunction from "lodash/isFunction";

import { Black } from "../../enum";
import { Ripple } from "../ripple/ripple";
import { ListContext } from "../listbox/listboxBase";

import { ListItemProps, ListItemTemplateArgs } from "./listItem.types";
import { getAriaSelected, getVisualStates } from "./listItemBase";

function renderDefault(args: ListItemTemplateArgs) {
    const { disabled = false, label } = args;
    return (
        <>
            {disabled !== true && (
                <Ripple
                    focused={false}
                    color={{
                        focusColor: Black.rippleWave,
                        waveColor: Black.rippleWave,
                    }}
                />
            )}
            {label}
        </>
    );
}

export const ListItem = ({
    label,
    value,
    loading,
    disabled: disabledProp = false,
    itemTemplate,
    onDisabledChange,
    ...props
}: ListItemProps) => {
    const listContext = useContext(ListContext);

    const liRef = useRef<HTMLLIElement>(null);

    const id = useId();

    // 当前项是否选中
    const [isSelected, setIsSelected] = useState(false);

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.ListItem,
        onDisabledChange,
    });

    useEffect(() => {
        if (listContext?.selectedValue === value) {
            listContext?.setActivedescendant(id);
        }
    }, [value, listContext, id]);

    useEffect(() => {
        setIsSelected(
            getAriaSelected(
                value,
                listContext?.selectedValue,
                listContext?.multiple
            )
        );
    }, [value, listContext]);

    function handleItemClick() {
        //选中当前项
        disabled !== true && listContext?.setSelectedValue(value as string);
    }

    function handleLiMouseDown() {
        listContext?.setItemMouseState(MouseState.mousedown);
    }

    function handleLiMouseUp() {
        listContext?.setItemMouseState(MouseState.none);
    }

    return (
        <li
            {...props}
            id={id}
            ref={liRef}
            onMouseDown={handleLiMouseDown}
            onMouseUp={handleLiMouseUp}
            className={getVisualStates(
                { disabled },
                {
                    focusState:
                        listContext?.focusValue === value
                            ? FocusState.focus
                            : FocusState.blur,
                },
                isSelected
            )}
            data-value={value}
            role="option"
            onClick={handleItemClick}
            aria-selected={isSelected}
        >
            {isFunction(itemTemplate)
                ? itemTemplate({
                      disabled,
                      label,
                      isSelected,
                      selectedValue: listContext?.selectedValue,
                      value,
                  })
                : renderDefault({
                      disabled,
                      label,
                      value,
                      isSelected,
                      selectedValue: listContext?.selectedValue,
                  })}
        </li>
    );
};

ListItem.displayName = ControlType.ListItem;
