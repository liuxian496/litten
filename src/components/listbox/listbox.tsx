import "./listbox.less";

import {
  KeyboardEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { ExceptionBoundary } from "exception-boundary";
import { useCurrentValue } from "litten-hooks/dist/contentControl";
import {
  LittenItem,
  LittenItems,
  SelectedValue,
} from "litten-hooks/dist/control/userControl/userControl.types";
import { ControlType, MouseState } from "litten-hooks/dist/enum";
import { usePrevious } from "litten-hooks/dist/usePrevious";
import {
  getLastSelectedIndex,
  getNextListFocusIndex,
  useVirtualFocus,
} from "litten-hooks/dist/useVirtualFocus";
import isArray from "lodash/isArray";

import { ListContextProps, ListboxProps } from "./listbox.types";
import {
  ListContext,
  getListItem,
  getNextMultiSelectedValue,
  getVisualStates,
} from "./listboxBase";

// listbox组件，支持单选和多选两种模式，受控和非受控两种使用方式
export const Listbox = forwardRef(function Listbox(
  { multiple, value, defaultValue, children, onChange, ...props }: ListboxProps,
  ref,
) {
  const [listItems, setListItems] = useState<LittenItems>([]);

  const [activedescendant, setActivedescendant] = useState("");

  const [itemMouseState, setItemMouseState] = useState(MouseState.none);

  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  useEffect(() => {
    const list: LittenItem[] = [];
    getListItem(list, children);
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
      }
      onChange?.({
        value: itemValue,
        controlType: ControlType.Listbox,
      });
    }
    setFocusValue(itemValue);
  }

  const [context, setContext] = useState<ListContextProps>({
    multiple,
    selectedValue: currentValue,
    setSelectedValue,
    setActivedescendant,
    setItemMouseState,
    focusValue,
  });

  const isUnControlled = value === undefined;
  const isControlled = !isUnControlled;
  const isMultiple = multiple === true;

  useEffect(() => {
    if (isUnControlled) {
      // 非受控时，设置defaultValue
      setCurrentValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMultiple && isUnControlled) {
      !isArray(defaultValue) &&
        setErrorMsg(
          "listbox defaultValue must be a sting[].when multiple is true.",
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMultiple && isControlled) {
      !isArray(currentValue) &&
        setErrorMsg("listbox value must be a sting[].when multiple is true.");
    }
  }, [currentValue, isControlled, isMultiple]);

  useEffect(() => {
    if (prevNextValue !== nextValue) {
      // 受控，调用onChange
      onChange?.({
        value: nextValue,
        controlType: ControlType.Listbox,
      });
    }
  }, [prevNextValue, nextValue, onChange]);

  useEffect(() => {
    setContext((prev) => {
      return {
        ...prev,
        selectedValue: currentValue,
        focusValue,
      };
    });
  }, [currentValue, focusValue]);

  useImperativeHandle(
    ref,
    () => {
      return {
        value: currentValue,
      };
    },
    [currentValue],
  );

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
      index = Math.max(index, 0);
      if (listItems[index]) {
        setFocusValue(listItems[index].value);
      }
    }
  }

  return (
    <ExceptionBoundary errorMsg={errorMsg}>
      <ListContext.Provider value={context}>
        <ul
          {...props}
          role="listbox"
          aria-multiselectable={multiple}
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
});

Listbox.displayName = ControlType.Listbox;
