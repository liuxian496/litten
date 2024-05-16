import React from "react";

import { FormLabelStory } from "../../stories/formLabel.stories";

import { Checkbox } from "../../components/checkbox/checkbox";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Placement } from "litten-hooks/dist/enum";

export const PlacementTest: FormLabelStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <FormLabel label="Top" labelPlacement={Placement.top}>
                    <Checkbox />
                </FormLabel>

                <FormLabel label="Right" labelPlacement={Placement.right}>
                    <Checkbox />
                </FormLabel>

                <FormLabel label="Bottom" labelPlacement={Placement.bottom}>
                    <Checkbox />
                </FormLabel>
                <FormLabel label="Left" labelPlacement={Placement.left}>
                    <Checkbox />
                </FormLabel>
            </>
        );
    },
};
