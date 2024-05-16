import React, { useState } from "react";

import { userEvent, waitFor, within, expect } from "@storybook/test";

import { TextFiledStory } from "../../stories/textField.stories";

import { Placement } from "litten-hooks/dist/enum";
import {
    LittenCheckedChangeEvent,
    LittenDisabledChangeEvent,
} from "litten-hooks/dist/control/event/littenEvent.types";

import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { TextField } from "../../components/textField/textField";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [disabled, setDisabled] = useState<boolean | undefined>(true);
    const [loading, setLoading] = useState<boolean | undefined>(true);
    const [msg, setMsg] = useState("");

    function handleDisableCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setDisabled(checked);
    }

    function handleLoadingCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setLoading(checked);
    }

    function handleTextFieldDisabledChanged(event: LittenDisabledChangeEvent) {
        const { disabled, controlType } = event;
        setMsg(`${controlType}'s disabled is changed to ${disabled}`);
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel label="Name: ">
                <TextField
                    data-testid="nameTextField"
                    disabled={disabled}
                    loading={loading}
                    onDisabledChange={handleTextFieldDisabledChanged}
                />
            </FormLabel>
            <FormLabel label="Disabled" labelPlacement={Placement.right}>
                <Checkbox
                    data-testid="disabled-checkbox"
                    checked={disabled}
                    onChange={handleDisableCheckboxChange}
                />
            </FormLabel>
            <FormLabel label="Loading" labelPlacement={Placement.right}>
                <Checkbox
                    data-testid="loading-checkbox"
                    checked={loading}
                    onChange={handleLoadingCheckboxChange}
                />
            </FormLabel>
            <div>{msg}</div>
        </StackPanel>
    );
};

export const DisabledTest: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const nameTextField = canvas.getByTestId("nameTextField");
        const DisabledCheckbox = canvas.getByTestId("disabled-checkbox");
        const LoadingCheckbox = canvas.getByTestId("loading-checkbox");

        await step('"Name" textField is disabled', async () => {
            await waitFor(() => expect(nameTextField).toBeDisabled());

            await waitFor(() =>
                expect(
                    canvas.getByText("TextField's disabled is changed to true")
                ).toBeInTheDocument()
            );
        });

        await step(
            'Unchecked "Loading" checkbox, "Name" textField is also disabled',
            async () => {
                await userEvent.click(LoadingCheckbox);

                await waitFor(() => expect(nameTextField).toBeDisabled());

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "TextField's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step(
            'Unchecked "Disabled" checkbox, "Name" textField is enable',
            async () => {
                await userEvent.click(DisabledCheckbox);

                await waitFor(() => expect(nameTextField).toBeEnabled());

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "TextField's disabled is changed to false"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step(
            'Checked "Loading" checkbox, "Name" textField is disabled',
            async () => {
                await userEvent.click(LoadingCheckbox);

                await waitFor(() => expect(nameTextField).toBeDisabled());

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "TextField's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );
    },
};
