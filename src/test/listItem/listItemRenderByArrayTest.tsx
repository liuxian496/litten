import React from "react";

import { ListItemStory } from "../../stories/listItem.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Ripple } from "../../components/ripple/ripple";
import { ListItemTemplateArgs } from "../../components/listItem/listItem.types";


type Item = { value: string; label: string };

const items: Item[] = [
    { value: "apple", label: "苹果" },
    { value: "banana", label: "香蕉" },
    { value: "pitahaya", label: "火龙果" },
    { value: "mangosteen", label: "山竹" },
];

function rednderListItem({
    disabled,
    label,
    selectedValue,
    value,
}: ListItemTemplateArgs) {
    return (
        <>
            <Checkbox
                tabIndex={-1}
                disabled={disabled}
                checked={selectedValue === value}
            />
            <span>{`${label}`}</span>
            <Ripple
                focused={false}
                color={{
                    focusColor: "rgba(0,0,0,0)",
                    waveColor: "rgba(0,0,0,0)"
                }}
            />
        </>
    );
}

function renderList(item: Item) {
    const { value, label } = item;
    return (
        <ListItem
            key={value}
            value={value}
            label={label}
            disabled={value == "banna"}
            itemTemplate={rednderListItem}
        />
    );
}

const Test = () => {
    return (
        <>
            <Listbox>{items.map((item: Item) => renderList(item))}</Listbox>
        </>
    );
};

export const RenderByArrayTest: ListItemStory = {
    render: () => <Test />,
};
