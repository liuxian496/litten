import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    useId,
    useCallback,
} from "react";

import { usePrevious } from "../../global/util";
import { ControlType } from "../../global/enum";

import { getCurrentValue } from "./contentControl";
import {
    CheckedControlGroup,
    CheckedControlProps,
    LittenCheckedGroups,
} from "./checkedControl.types";


// const LittenCheckboxGroups = {} as LittenCheckedGroups;
const LittenRadioGroups = {} as LittenCheckedGroups;

function getGroupsByUserControlType(type?: ControlType) {
    let groups = {} as LittenCheckedGroups;

    switch (type) {
        // case ControlType.Checkbox:
        //     group = LittenCheckboxGroups;
        //     break;
        case ControlType.Radio:
            groups = LittenRadioGroups;
            break;
    }

    return groups;
}

function addCheckedGroup(
    props: CheckedControlGroup,
    setChecked: Dispatch<SetStateAction<boolean | undefined>>
) {
    const { name, value, uuid, controlType } = props;

    if (name !== undefined) {
        const groups = getGroupsByUserControlType(controlType);

        groups[name] === undefined && (groups[name] = {});

        groups[name][uuid] = {
            setChecked,
            value,
        };
    }
}

function removeCheckedGroup(props: CheckedControlGroup) {
    const { name, uuid, controlType } = props;

    if (name !== undefined) {
        const groups = getGroupsByUserControlType(controlType);
        delete groups[name][uuid];
    }
}

function updateCheckedGroup(props: CheckedControlGroup) {
    const { name, uuid, controlType } = props;

    if (name !== undefined) {
        const groups = getGroupsByUserControlType(controlType);
        const group = groups[name];

        // 更新组内的其他控件
        Object.keys(group).forEach((key) => {
            if (key !== uuid) {
                group[key].setChecked(false);
            }
        });
    }
}

/**
 * 通过单选按钮组的值，设置选中的单选按钮
 * @param name 组名称
 * @param controlType UserControl类型
 * @param value 单选按钮组的值
 */
export function setCheckedByGroupValue(
    name: string,
    controlType: ControlType,
    value: string
) {
    const groups = getGroupsByUserControlType(controlType);
    const group = groups[name];

    Object.keys(group).forEach((key) => {
        const current = group[key];
        if (value === current.value) {
            current.setChecked(true);
        }
    });
}

/**
 * 控制控件的选中状态，并触发对应的change事件
 * @param props 控件属性 CheckedControlProps
 */
export function useCurrentChecked<T>(props: CheckedControlProps<T>) {
    const { checked, defaultChecked, controlType, onChange, value } = props;

    const prevChecked = usePrevious(checked);

    const [current, setCurrent] = useState<boolean | undefined>(
        getCurrentValue<boolean>(checked, defaultChecked)
    );
    const previous = usePrevious(current);

    const [originalEvent, setOriginalEvent] = useState<ChangeEvent<T>>();

    const [updateGroup] = useCheckedGroup<T>(props, setCurrent);

    useEffect(() => {
        if (prevChecked !== checked) {
            setOriginalEvent(undefined);
            setCurrent(getCurrentValue<boolean>(checked, defaultChecked));
        }
    }, [prevChecked, checked, defaultChecked]);

    useEffect(() => {
        if (previous !== current) {
            onChange?.({
                e: originalEvent,
                value,
                controlType,
                checked: current,
            });

            current === true && updateGroup();
        }
    });

    return [current, setCurrent, setOriginalEvent] as [
        boolean | undefined,
        Dispatch<SetStateAction<boolean | undefined>>,
        Dispatch<SetStateAction<ChangeEvent<T> | undefined>>
    ];
}

function useCheckedGroup<T>(
    props: CheckedControlProps<T>,
    setChecked: Dispatch<SetStateAction<boolean | undefined>>
) {
    const { name, controlType, value } = props;

    const uuid = useId() + "-litten";

    useEffect(() => {
        addCheckedGroup({ name, value, uuid, controlType }, setChecked);
        return () => {
            removeCheckedGroup({ name, uuid, controlType });
        };
    }, [name, value, uuid, controlType, setChecked]);

    const updateGroup = useCallback(() => {
        updateCheckedGroup({ name, uuid, controlType });
    }, [name, uuid, controlType]);

    return [updateGroup];
}
