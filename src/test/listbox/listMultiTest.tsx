import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { LittenListChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";

import { ButtonStory } from "../../stories/button.stories";

import { Mode, Size } from "../../global/enum";
import { Listbox } from "../../components/listbox/listbox";
import { ListGroup } from "../../components/listGroup/listGroup";
import { ListItem } from "../../components/listItem/listItem";


const Test = () => {
    const [selectedValue, setSelectedValue] = useState<string[] | undefined>();

    function handleChange(e: LittenListChangeEvent) {
        const { value } = e;
        setSelectedValue(value as string[]);
    }
    return (
        <>
            <Listbox data-testid="listbox" onChange={handleChange} defaultValue={["a"]} multiple>
                <ListGroup>
                    <ListItem value="a" label="a" />
                    <ListItem value="b" label="b" />
                    <ListItem data-testid="cItem" value="c" label="c" disabled>
                        c
                    </ListItem>
                    <ListItem data-testid="dItem" value="d" label="d" />
                    <ListItem value="e" label="e" />
                </ListGroup>
                <ListItem value="f" label="f" />
                <ListItem value="g" label="g" />
                <ListItem data-testid="hItem" value="h" label="h" />
                <ListItem value="i" label="i" />
            </Listbox>
            <div>{`SelectedValue is ${selectedValue}`}</div>
        </>
    );
};

export const MultiTest: ButtonStory = {
    args: {
        mode: Mode.primary,
        size: Size.medium,
        disabled: false,
        loading: false,
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const listbox = canvas.getByTestId("listbox");
        const dItem  = canvas.getByTestId("dItem");
        const hItem  = canvas.getByTestId("hItem");

        await step(
            'Listbox defaultValue is a.Then "SelectedValue is a" to be in the document.',
            async () => {
                await expect(
                    await canvas.findByText("SelectedValue is a")
                ).toBeInTheDocument();
            }
        );

        await step('Click Tab.Then "listbox" to have focus.', async () => {
            await userEvent.tab();

            await expect(listbox).toHaveFocus();
        });

        await step('Click {ArrowDown}{ArrowDown}{Spacebar} with keyboard.Then "SelectedValue is a,d" to be in the document.', async () => {
            await userEvent.keyboard("{ArrowDown}{ArrowDown}{Spacebar}");

            await expect(
                await canvas.findByText("SelectedValue is a,d")
            ).toBeInTheDocument();
        });

        await step('Click "h" listItem with keyboard.Then "SelectedValue is a,d,h" to be in the document.', async () => {
            await userEvent.click(hItem);

            await expect(
                await canvas.findByText("SelectedValue is a,d,h")
            ).toBeInTheDocument();
        });

        await step('Click {ArrowUp}{Spacebar} with keyboard.Then "SelectedValue is a,d,h,g" to be in the document.', async () => {
            await userEvent.keyboard("{ArrowUp}{Spacebar}");

            await expect(
                await canvas.findByText("SelectedValue is a,d,h,g")
            ).toBeInTheDocument();
        });

        await step('Click "d" listItem with keyboard.Then "SelectedValue is a,h,g" to be in the document.', async () => {
            await userEvent.click(dItem);

            await expect(
                await canvas.findByText("SelectedValue is a,h,g")
            ).toBeInTheDocument();
        });
        
        await step('Click {ArrowUp}{ArrowUp}{Spacebar} with keyboard.Then "SelectedValue is a,d,h,g" to be in the document.', async () => {
            await userEvent.keyboard("{ArrowUp}{ArrowUp}{Spacebar}");

            await expect(
                await canvas.findByText("SelectedValue is h,g")
            ).toBeInTheDocument();
        });

    },
};
