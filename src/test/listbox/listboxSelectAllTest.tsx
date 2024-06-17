import React, { useEffect, useState } from "react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import { Placement } from "litten-hooks/dist/enum";

import { ListboxStory } from "../../stories/listbox.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";
import { Checkbox } from "../../components/checkbox/checkbox";
import { TextField } from "../../components/textField/textField";
import { Ripple } from "../../components/ripple/ripple";
import { FormLabel } from "../../components/formLabel/formLabel";
import {
    LittenCheckedChangeEvent,
    LittenListChangeEvent,
    LittenTextChangeEvent,
} from "litten-hooks/dist/control/event/littenEvent.types";
import { StackPanel } from "../../components/stackPanel/stackPanel";

type Item = { value: string; label: string };

const items: Item[] = [
    { value: "apple", label: "苹果" },
    { value: "banana", label: "香蕉" },
    { value: "pitahaya", label: "火龙果" },
    { value: "mangosteen", label: "山竹" },
];

// 用受控的方式控制listbox
const Test = () => {
    const [isSelectAllIndeterminate, setIsSelectAllIndeterminate] = useState<
        boolean | undefined
    >();
    const [listData, setListData] = useState([...items]);

    const [isSelectAll, setIsSelectAll] = useState<boolean | undefined>(true);

    const [listValue, setListValue] = useState<string[]>([
        ...listData.map((item) => item.value),
    ]);
    
    useEffect(() => {
        if (listValue.length === listData.length) {
            setIsSelectAllIndeterminate(false);
            setIsSelectAll(true);
        } else if (listValue.length < listData.length) {
            if (listValue.length === 0) {
                setIsSelectAll(false);
                setIsSelectAllIndeterminate(false);
            } else {
                setIsSelectAllIndeterminate(true);
            }
        }
    }, [listValue, listData]);

    useEffect(() => {
        setListValue([...listData.map((item) => item.value)]);
    }, [listData]);

    function handleSearchChange(e: LittenTextChangeEvent) {
        const { value } = e;
        if (value === "") {
            setListData([...items]);
        } else {
            setListData([...items.filter((item) => item.label === value)]);
        }
    }

    function handleSelectAllChange(event: LittenCheckedChangeEvent) {
        const { e, checked } = event;
        // 只有用户点击，才重新设置
        if (e) {
            setIsSelectAll(checked);
            if (checked === true) {
                setListValue([...listData.map((item) => item.value)]);
            } else {
                setListValue([]);
            }
        }
    }

    function handleListChange(event: LittenListChangeEvent) {
        if (event.value?.length !== listValue.length) {
            setListValue(event.value as string[]);
        }
    }

    return (
        <div style={{ border: "1px solid #e0e0e0" }}>
            <StackPanel alignItems="center">
                <span>Search:</span>
                <TextField
                    data-testid="search"
                    defaultValue=""
                    onChange={handleSearchChange}
                />
            </StackPanel>
            <FormLabel label="Select All" labelPlacement={Placement.right}>
                <Checkbox
                    data-testid="selectAll"
                    checked={isSelectAll}
                    indeterminate={isSelectAllIndeterminate}
                    onChange={handleSelectAllChange}
                />
            </FormLabel>
            <Listbox multiple value={listValue} onChange={handleListChange}>
                {listData.map((item: Item) => {
                    const { value, label } = item;
                    return (
                        <ListItem
                            key={value}
                            value={value}
                            label={label}
                            data-testid={`listItem-${value}`}
                            itemTemplate={({ disabled, label, isSelected }) => {
                                return (
                                    <>
                                        <Checkbox
                                            tabIndex={-1}
                                            disabled={disabled}
                                            checked={isSelected}
                                            value={value}
                                        />
                                        <span>{`${label}`}</span>
                                        <Ripple
                                            focused={false}
                                            color={{
                                                focusColor: "rgba(0,0,0,0)",
                                                waveColor: "rgba(0,0,0,0)",
                                            }}
                                        />
                                    </>
                                );
                            }}
                        />
                    );
                })}
            </Listbox>
            <div>{`listValue: ${listValue.toString()}`}</div>
        </div>
    );
};

export const SelectAllTest: ListboxStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const searchTextField = canvas.getByTestId("search");
        const selectAllCheckbox = canvas.getByTestId("selectAll");
        const appleListItem = canvas.getByTestId("listItem-apple");
        const mangosteenListItem = canvas.getByTestId("listItem-mangosteen");

        await step(
            'Listbox default select all. Then "listValue: apple,banana,pitahaya,mangosteen" to be in the document.',
            async () => {
                await expect(
                    await canvas.findByText(
                        "listValue: apple,banana,pitahaya,mangosteen"
                    )
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "苹果" ListItem. Then "listValue: banana,pitahaya,mangosteen" to be in the document.',
            async () => {
                await userEvent.click(appleListItem);

                await expect(
                    await canvas.findByText(
                        "listValue: banana,pitahaya,mangosteen"
                    )
                ).toBeInTheDocument();

                await expect(selectAllCheckbox).toBeChecked();
            }
        );

        await step(
            'Click "Select All" Checkbox. Then "listValue:" to be in the document.',
            async () => {
                await userEvent.click(selectAllCheckbox);

                await expect(
                    await canvas.findByText("listValue:")
                ).toBeInTheDocument();

                await expect(selectAllCheckbox).not.toBeChecked();
            }
        );

        await step(
            'Click "山竹" ListItem. Then "listValue: mangosteen" to be in the document.',
            async () => {
                await userEvent.click(mangosteenListItem);

                await expect(
                    await canvas.findByText("listValue: mangosteen")
                ).toBeInTheDocument();

                await expect(selectAllCheckbox).not.toBeChecked();
            }
        );

        await step(
            'Click "Select All" Checkbox. Then "listValue: apple,banana,pitahaya,mangosteen" to be in the document.',
            async () => {
                await userEvent.click(selectAllCheckbox);

                await expect(
                    await canvas.findByText(
                        "listValue: apple,banana,pitahaya,mangosteen"
                    )
                ).toBeInTheDocument();

                await expect(selectAllCheckbox).toBeChecked();
            }
        );

        await step(
            'Type "苹果" in "Search" TextField. Then "listValue: apple" to be in the document.',
            async () => {
                await userEvent.type(searchTextField, "苹果");

                await expect(
                    await canvas.findByText("listValue: apple")
                ).toBeInTheDocument();

                await expect(selectAllCheckbox).toBeChecked();
            }
        );

        await step(
            'Click "苹果" ListItem. Then "listValue:" to be in the document.',
            async () => {
                // 搜索之后，文档重新渲染，listItem-apple需要重新查找
                await userEvent.click(canvas.getByTestId("listItem-apple"));

                await expect(
                    await canvas.findByText("listValue:")
                ).toBeInTheDocument();

                await expect(selectAllCheckbox).not.toBeChecked();
            }
        );

        await step(
            'Clear "Search" TextField. Then "listValue: apple,banana,pitahaya,mangosteen" to be in the document.',
            async () => {
                await userEvent.clear(searchTextField);

                await expect(
                    await canvas.findByText(
                        "listValue: apple,banana,pitahaya,mangosteen"
                    )
                ).toBeInTheDocument();

                await waitFor(() => expect(selectAllCheckbox).toBeChecked());
            }
        );
    },
};
