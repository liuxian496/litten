import React, { useState } from "react";

import { within, userEvent, waitFor, fireEvent, expect } from "@storybook/test";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { Mode } from "../../global/enum";
import { LittenDisabledChangeEvent } from "../../components/control/littenEvent.types";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Switch } from "../../components/switch/switch";
import { Button } from "../../components/button/button";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [disabled, seDisabled] = useState(true);

    const [msg, setMsg] = useState("");

    function handleChangeDisabledClick() {
        seDisabled(!disabled);
    }

    function handleXboxSwitchDisabledChanged(event: LittenDisabledChangeEvent) {
        const { disabled, controlType } = event;
        setMsg(`The xbox ${controlType}'s disabled is changed to ${disabled}`);
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel
                data-testid="switchLabel"
                label="Switch"
                disabled={disabled}
            >
                <Switch
                    data-testid="switch"
                    defaultChecked={true}
                    disabled={disabled}
                />
            </FormLabel>
            <FormLabel label="Xbox" disabled={disabled}>
                <Switch
                    data-testid="xbox"
                    disabled={disabled}
                    onDisabledChange={handleXboxSwitchDisabledChanged}
                />
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

        const switchLabel = canvas.getByTestId("switchLabel");
        const switchControl = canvas.getByTestId("switch");
        const xbox = canvas.getByTestId("xbox");
        const changeBtu = canvas.getByText("Change Disabled");

        await step(
            '"Switch" is disabled and checked, "Xbox" is disabled and unchecked',
            async () => {
                await expect(switchControl).toBeChecked();

                await expect(xbox).not.toBeChecked();

                await waitFor(() => {
                    expect(switchControl).toBeDisabled();
                    expect(xbox).toBeDisabled();
                });

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "The xbox Switch's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step(
            'Click "Switch" label. Then it is also checked',
            async () => {
                await fireEvent.click(switchLabel);

                await expect(switchControl).toBeChecked();
            }
        );

        await step('Click "Xbox". Then it is also unchecked', async () => {
            await userEvent.click(xbox);

            await expect(xbox).not.toBeChecked();
        });

        await step(
            'Click "Change Disabled" button. Then switch controls are enable',
            async () => {
                await userEvent.click(changeBtu);

                await expect(switchControl).toBeEnabled();
                await expect(xbox).toBeEnabled();

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "The xbox Switch's disabled is changed to false"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step('Click "Switch". Then it is unchecked', async () => {
            await userEvent.click(switchControl);

            await expect(switchControl).not.toBeChecked();
        });

        await step('Click "Xbox". Then it is checked', async () => {
            await userEvent.click(xbox);

            await expect(xbox).toBeChecked();
        });

        await step(
            'Click "Change Disabled" button. Then switch controls are disabled',
            async () => {
                await userEvent.click(changeBtu);

                await expect(switchControl).toBeDisabled();

                await expect(xbox).toBeDisabled();

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "The xbox Switch's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );
    },
};
