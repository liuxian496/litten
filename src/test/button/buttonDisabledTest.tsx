import React, { useState } from "react";

import { Placement } from "litten-hooks/dist/enum";

import { userEvent, waitFor, within, expect } from "@storybook/test";

import { ButtonStory } from "../../stories/button.stories";

import { Mode } from "../../global/enum";
import {
    LittenCheckedChangeEvent,
    LittenDisabledChangeEvent,
} from "litten-hooks/dist/control/event/littenEvent.types";

import { Button } from "../../components/button/button";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
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

    function handlePrimaryBtuDisabledChanged(event: LittenDisabledChangeEvent) {
        const { disabled, controlType } = event;
        setMsg(`Primary ${controlType}'s disabled is changed to ${disabled}`);
    }

    return (
        <>
            <Button disabled={disabled} loading={loading}>
                Text
            </Button>
            <Button
                mode={Mode.primary}
                disabled={disabled}
                loading={loading}
                style={{ marginLeft: "16px" }}
                onDisabledChange={handlePrimaryBtuDisabledChanged}
            >
                Primary
            </Button>
            <Button
                mode={Mode.outlined}
                disabled={disabled}
                loading={loading}
                style={{ marginLeft: "16px" }}
            >
                Outlined
            </Button>
            <StackPanel direction="column" alignItems="flex-start">
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
        </>
    );
};

export const DisabledTest: ButtonStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const textBtu = canvas.getByText("Text");
        const primaryBtu = canvas.getByText("Primary");
        const outlinedBtu = canvas.getByText("Outlined");
        const DisabledCheckbox = canvas.getByTestId("disabled-checkbox");
        const LoadingCheckbox = canvas.getByTestId("loading-checkbox");

        await step("Buttons are disabled", async () => {
            await waitFor(() => expect(textBtu).toBeDisabled());

            await waitFor(() => expect(primaryBtu).toBeDisabled());

            await waitFor(() => expect(outlinedBtu).toBeDisabled());

            await waitFor(() =>
                expect(
                    canvas.getByText(
                        "Primary Button's disabled is changed to true"
                    )
                ).toBeInTheDocument()
            );
        });

        await step(
            'Unchecked "Loading" checkbox, then buttons are also disabled',
            async () => {
                await userEvent.click(LoadingCheckbox);

                await waitFor(() => expect(textBtu).toBeDisabled());

                await waitFor(() => expect(primaryBtu).toBeDisabled());

                await waitFor(() => expect(outlinedBtu).toBeDisabled());

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "Primary Button's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step(
            'Unchecked "Disabled" checkbox, then buttons are enable',
            async () => {
                await userEvent.click(DisabledCheckbox);

                await waitFor(() => expect(textBtu).toBeEnabled());

                await waitFor(() => expect(primaryBtu).toBeEnabled());

                await waitFor(() => expect(outlinedBtu).toBeEnabled());

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "Primary Button's disabled is changed to false"
                        )
                    ).toBeInTheDocument()
                );
            }
        );

        await step(
            'Checked "Loading" checkbox, then buttons are disabled',
            async () => {
                await userEvent.click(LoadingCheckbox);

                await waitFor(() => expect(textBtu).toBeDisabled());

                await waitFor(() => expect(primaryBtu).toBeDisabled());

                await waitFor(() => expect(outlinedBtu).toBeDisabled());

                await waitFor(() =>
                    expect(
                        canvas.getByText(
                            "Primary Button's disabled is changed to true"
                        )
                    ).toBeInTheDocument()
                );
            }
        );
    },
};
