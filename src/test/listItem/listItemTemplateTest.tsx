import React from "react";

import { ListItemStory } from "../../stories/listItem.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Ripple } from "../../components/ripple/ripple";

const Test = () => {
    return (
        <>
            <Listbox>
                <ListItem value="fruit" label="fruit" />
                <ListItem
                    value="apple"
                    itemTemplate={({ value, selectedValue, disabled }) => {
                        return (
                            <>
                                <FormLabel
                                    labelStyle={{ minWidth: 100 }}
                                    label="apple:"
                                >
                                    <Checkbox
                                        checked={selectedValue === value}
                                    />
                                </FormLabel>
                                {disabled !== true && (
                                    <Ripple
                                        focused={false}
                                        color={{
                                            focusColor: "rgba(40, 180, 99,0.3)",
                                            waveColor: "rgba(40, 180, 99,0.3)",
                                        }}
                                    />
                                )}
                            </>
                        );
                    }}
                />
                <ListItem
                    value="banana"
                    itemTemplate={({ value, selectedValue, disabled }) => {
                        return (
                            <>
                                <FormLabel
                                    labelStyle={{ minWidth: 100 }}
                                    label="banana:"
                                >
                                    <Checkbox
                                        checked={selectedValue === value}
                                    />
                                </FormLabel>
                                {disabled !== true && (
                                    <Ripple
                                        focused={false}
                                        color={{
                                            focusColor:
                                                "rgba(244, 208, 63,0.3)",
                                            waveColor: "rgba(244, 208, 63,0.3)",
                                        }}
                                    />
                                )}
                            </>
                        );
                    }}
                />
                <ListItem
                    value="pitahaya"
                    itemTemplate={({ value, selectedValue, disabled }) => {
                        return (
                            <>
                                <FormLabel
                                    labelStyle={{ minWidth: 100 }}
                                    label="pitahaya:"
                                >
                                    <Checkbox
                                        checked={selectedValue === value}
                                    />
                                </FormLabel>
                                {disabled !== true && (
                                    <Ripple
                                        focused={false}
                                        color={{
                                            focusColor: "rgba(255, 0, 255,0.3)",
                                            waveColor: "rgba(255, 0, 255,0.3)",
                                        }}
                                    />
                                )}
                            </>
                        );
                    }}
                />
                <ListItem
                    value="mangosteen"
                    itemTemplate={({ value, selectedValue, disabled }) => {
                        return (
                            <>
                                <FormLabel
                                    labelStyle={{ minWidth: 100 }}
                                    label="mangosteen:"
                                >
                                    <Checkbox
                                        checked={selectedValue === value}
                                    />
                                </FormLabel>
                                {disabled !== true && (
                                    <Ripple
                                        focused={false}
                                        color={{
                                            focusColor:
                                                "rgba(231, 76, 60 ,0.3)",
                                            waveColor: "rgba(231, 76, 60 ,0.3)",
                                        }}
                                    />
                                )}
                            </>
                        );
                    }}
                />
            </Listbox>
        </>
    );
};

export const TemplateTest: ListItemStory = {
    render: () => <Test />,
};
