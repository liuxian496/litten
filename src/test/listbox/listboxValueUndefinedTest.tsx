import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { LittenListChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";

import { ListboxStory } from "../../stories/listbox.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";
import { Button } from "../../components/button/button";

const Test = () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    function handleChange(e: LittenListChangeEvent) {
        setSelectedValue(e.value as string);
    }

    return (
        <>
            <Button>Tom</Button>
            <Listbox data-testid="listbox" onChange={handleChange}>
                <ListItem value="a" label="a" />
                <ListItem value="b" label="b" />
                <ListItem value="c" label="c" />
                <ListItem value="d" label="d" />
                <ListItem value="e" label="e" />
                <ListItem value="f" label="f" />
                <ListItem value="g" label="g" />
                <ListItem value="h" label="h" />
                <ListItem value="i" label="i" />
            </Listbox>
            <div>{`SelectedValue is ${selectedValue}`}</div>
        </>
    );
};

export const UndefinedTest: ListboxStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step(
            'Listbox without defaultValue and value. Then "SelectedValue is undefined" to be in the document.',
            async () => {
                await expect(
                    await canvas.findByText("SelectedValue is undefined")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {ArrowDown}{Spacebar} with keyboard.Then "SelectedValue is g" to be in the document.',
            async () => {
                await userEvent.click(canvas.getByText("Tom"));
                await userEvent.tab();
            }
        );
    },
};
