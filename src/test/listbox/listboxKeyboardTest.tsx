import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";
import { LittenListChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";

import { ListboxStory } from "../../stories/listbox.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListGroup } from "../../components/listGroup/listGroup";
import { ListItem } from "../../components/listItem/listItem";
import { Button } from "../../components/button/button";

const Test = () => {
    const [disabled, setDisabled] = useState(true);
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    function handleJDisabledButtonClick() {
        setDisabled((prev) => {
            return !prev;
        });
    }

    function handleChange(e: LittenListChangeEvent) {
        setSelectedValue(e.value as string);
    }

    return (
        <>
            <Listbox
                data-testid="listbox"
                onChange={handleChange}
                defaultValue="b"
            >
                <ListGroup>
                    <ListItem value="a" label="a" disabled={disabled} />
                    <ListItem value="b" label="b" />
                    <ListItem value="c" label="c" disabled />
                    <ListItem value="d" label="d" />
                    <ListItem value="e" label="e" disabled />
                </ListGroup>
                <ListItem value="f" label="f" />
                <ListItem value="g" label="g" disabled />
                <ListItem value="h" label="h" disabled />
                <ListItem value="i" label="i" />
                <ListItem value="j" label="j" disabled={disabled} />
            </Listbox>
            <Button onClick={handleJDisabledButtonClick}>
                Toggle Disabled
            </Button>
            <div>{`SelectedValue is ${selectedValue}`}</div>
        </>
    );
};

export const ListboxKeyboardTest: ListboxStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const listbox = canvas.getByTestId("listbox");
        const toggleDisabledBtu = canvas.getByText("Toggle Disabled");

        await step(
            'Listbox defaultValue is b.Then "SelectedValue is b" to be in the document.',
            async () => {
                await expect(
                    await canvas.findByText("SelectedValue is b")
                ).toBeInTheDocument();
            }
        );

        await step('Click Tab.Then "listbox" to have focus.', async () => {
            await userEvent.tab();

            await expect(listbox).toHaveFocus();
        });

        await step(
            'Click {ArrowUp}{Spacebar} with keyboard.Then "SelectedValue is b" to be in the document.',
            async () => {
                await userEvent.keyboard("{ArrowUp}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is b")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {ArrowDown}{Spacebar} with keyboard.Then "SelectedValue is d" to be in the document.',
            async () => {
                await userEvent.keyboard("{ArrowDown}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is d")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {ArrowDown}{ArrowDown}{Spacebar} with keyboard.Then "SelectedValue is i" to be in the document.',
            async () => {
                await userEvent.keyboard("{ArrowDown}{ArrowDown}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is i")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {ArrowDown}{Spacebar} with keyboard.Then "SelectedValue is i" to be in the document.',
            async () => {
                await userEvent.keyboard("{ArrowDown}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is i")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {ArrowUp}{Spacebar} with keyboard.Then "SelectedValue is f" to be in the document.',
            async () => {
                await userEvent.keyboard("{ArrowUp}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is f")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {Home}{Spacebar} with keyboard.Then "SelectedValue is b" to be in the document.',
            async () => {
                await userEvent.keyboard("{Home}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is b")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {End}{Spacebar} with keyboard.Then "SelectedValue is b" to be in the document.',
            async () => {
                await userEvent.keyboard("{End}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is i")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Toggle Disabled" button, Click "{Shift}+{TAB}" with keyboard.Then "SelectedValue is i" to be in the document.',
            async () => {
                await userEvent.click(toggleDisabledBtu);
                await userEvent.tab({ shift: true });
                await expect(
                    await canvas.findByText("SelectedValue is i")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {Home}{Spacebar} with keyboard.Then "SelectedValue is a" to be in the document.',
            async () => {
                await userEvent.keyboard("{Home}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is a")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click {End}{Spacebar} with keyboard.Then "SelectedValue is j" to be in the document.',
            async () => {
                await userEvent.keyboard("{End}{Spacebar}");
                await expect(
                    await canvas.findByText("SelectedValue is j")
                ).toBeInTheDocument();
            }
        );

    },
};
