import React, { useState } from "react";

import { within, userEvent, waitFor, fireEvent, expect } from "@storybook/test";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { Mode } from "../../global/enum";
import { LittenDisabledChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Button } from "../../components/button/button";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [disabled, seDisabled] = useState(true);
    const [msg, setMsg] = useState("");

    function handleChangeDisabledClick() {
        seDisabled(!disabled);
    }

    function handleSwitchCheckboxDisabledChanged(
        event: LittenDisabledChangeEvent
    ) {
        const { disabled, controlType } = event;
        setMsg(`Switch ${controlType}'s disabled is changed to ${disabled}`);
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel
                data-testid="switchLabel"
                label="Switch"
                disabled={disabled}
            >
                <Checkbox
                    data-testid="switch"
                    defaultChecked={true}
                    disabled={disabled}
                    onDisabledChange={handleSwitchCheckboxDisabledChanged}
                />
            </FormLabel>
            <FormLabel label="Xbox" disabled={disabled}>
                <Checkbox data-testid="xbox" disabled={disabled} />
            </FormLabel>
            <Button mode={Mode.outlined} onClick={handleChangeDisabledClick}>
                Change Disabled
            </Button>
            <div>{msg}</div>
        </StackPanel>
    );
};

export const DisabledTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step(
            '"Switch" is disabled and checked, "Xbox" is disabled and unchecked',
            async () => {
                await expect(canvas.getByTestId("switch")).toBeChecked();

                await expect(canvas.getByTestId("xbox")).not.toBeChecked();

                await waitFor(() =>
                    expect(canvas.getByTestId("switch")).toBeDisabled()
                );

                await waitFor(() =>
                    expect(canvas.getByTestId("xbox")).toBeDisabled()
                );

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "Switch Checkbox's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step('Click "Switch" label, it is also checked', async () => {
            await fireEvent.click(canvas.getByTestId("switchLabel"));

            await waitFor(() =>
                expect(canvas.getByTestId("switch")).toBeChecked()
            );
        });

        await step('Click "Xbox", it is also unchecked', async () => {
            await userEvent.click(canvas.getByTestId("xbox"));

            await expect(canvas.getByTestId("xbox")).not.toBeChecked();
        });

        await step(
            'Click "Change Disabled" button, checkbox is enable',
            async () => {
                await userEvent.click(canvas.getByText("Change Disabled"));

                await waitFor(() =>
                    expect(canvas.getByTestId("switch")).toBeEnabled()
                );

                await waitFor(() =>
                    expect(canvas.getByTestId("xbox")).toBeEnabled()
                );

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "Switch Checkbox's disabled is changed to false"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step('Click "Switch", it is unchecked', async () => {
            await userEvent.click(canvas.getByTestId("switch"));

            await expect(canvas.getByTestId("switch")).not.toBeChecked();
        });

        await step('Click "Xbox", it is checked', async () => {
            await userEvent.click(canvas.getByTestId("xbox"));

            await expect(canvas.getByTestId("xbox")).toBeChecked();
        });

        await step(
            'Click "Change Disabled" button, checkbox is disabled',
            async () => {
                await userEvent.click(canvas.getByText("Change Disabled"));

                await waitFor(() =>
                    expect(canvas.getByTestId("switch")).toBeDisabled()
                );

                await waitFor(() =>
                    expect(canvas.getByTestId("xbox")).toBeDisabled()
                );

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "Switch Checkbox's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );
    },
};
