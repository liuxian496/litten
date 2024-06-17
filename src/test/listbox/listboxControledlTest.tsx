import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";

import { ListboxStory } from "../../stories/listbox.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";
import { FormLabel } from "../../components/formLabel/formLabel";
import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Placement } from "litten-hooks";
import { LittenListChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";

const Test = () => {
    // 受控时listbox的value需要设置成不是undefined的值
    const [selectedFruit, setSelectedFruit] = useState<string>("");

    function handleFruitListboxChange(e: LittenListChangeEvent) {
        setSelectedFruit(e.value as string);
    }

    return (
        <StackPanel direction="column" alignItems="stretch">
            <FormLabel label="水果:" labelPlacement={Placement.top}>
                <Listbox
                    value={selectedFruit}
                    onChange={handleFruitListboxChange}
                >
                    <ListItem value="apple" label="苹果" />
                    <ListItem value="banana" label="香蕉" />
                    <ListItem value="pitahaya" label="火龙果" />
                    <ListItem
                        data-testid="mangosteen"
                        value="mangosteen"
                        label="山竹"
                    />
                </Listbox>
            </FormLabel>
            <div>{`SelectedFruit is:${selectedFruit}`}</div>
        </StackPanel>
    );
};

export const ControlledTest: ListboxStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const mangosteenItem = canvas.getByTestId("mangosteen");

        await step(
            'Listbox defaultValue is "". Then "SelectedFruit is:" to be in the document.',
            async () => {
                await expect(
                    await canvas.findByText("SelectedFruit is:")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "山竹" listItme. Then "SelectedFruit is:mangosteen" to be in the document.',
            async () => {
                await userEvent.click(mangosteenItem);

                await expect(
                    await canvas.findByText("SelectedFruit is:mangosteen")
                ).toBeInTheDocument();
            }
        );
    },
};
