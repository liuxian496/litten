import React from "react";

import { FormLabelStory } from "../../stories/formLabel.stories";

import { Checkbox } from "../../components/checkbox/checkbox";
import { FormLabel } from "../../components/formLabel/formLabel";

export const DefaultTest: FormLabelStory = {
    args: {
        disabled: false,
        loading: false,
    },
    render: (args) => {
        return (
            <FormLabel label="Name:">
                <Checkbox />
            </FormLabel>
        );
    },
};
