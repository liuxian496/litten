import React from "react";

import { FormLabelStory } from "../../stories/formLabel.stories";

import { Checkbox } from "../../components/checkbox/checkbox";
import { FormLabel } from "../../components/formLabel/formLabel";
import { StackPanel } from "../../components/stackPanel/stackPanel";

export const LabelStyleTest: FormLabelStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <div>
                    <FormLabel label="Apple:" labelStyle={{ width: "200px" }}>
                        <Checkbox />
                    </FormLabel>
                </div>
                <StackPanel>
                    <FormLabel
                        label="Banana:"
                        style={{ flex: "auto" }}
                        labelStyle={{ flexBasis: "200px" }}
                    >
                        <Checkbox />
                    </FormLabel>
                </StackPanel>
            </>
        );
    },
};
