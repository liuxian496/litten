import React from "react";

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { FormLabelStory } from "../../stories/formLabel.stories";

import { Checkbox } from "../../components/checkbox/checkbox";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Placement } from "../../global/enum";
import { FormLabelProps } from "../../components/formLabel/formLabel.types";

const Test = (props: FormLabelProps) => {
    const { disabled, loading } = props;

    return (
        <FormLabel {...props} label="Name:">
            <Checkbox data-testid="nameCheckbox" disabled={disabled} loading={loading} />
        </FormLabel>
    );
};

export const DefaultTest: FormLabelStory = {
    args: {
        disabled: false,
        loading: false,
        labelPlacement: Placement.left,
    },
    render: (args) => <Test {...args} />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const nameLabel = canvas.getByText("Name:");
        const nameCheckbox = canvas.getByTestId("nameCheckbox");

        await step('Click "Name:" label. Then checkbox is cheked; Ripple focused part is not in the document. ', async () => {
            await userEvent.click(nameLabel);

            await expect(
                nameCheckbox
            ).toBeChecked();

            expect(
                canvas.queryByTestId("litten-ripple__focus")
            ).not.toBeInTheDocument();
        });
    },
};
