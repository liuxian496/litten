import React from "react";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { Size } from "../../global/enum";
import { Checkbox } from "../../components/checkbox/checkbox";

export const DefaultTest: CheckboxStory = {
    args: {
        size: Size.medium,
        disabled: false,
        indeterminate: false,
        checked: false,
        loading: false,
    },
    render: (args) => {
        const { checked, disabled, indeterminate, loading, size } = args;
        return (
            <>
                <Checkbox
                    checked={checked}
                    disabled={disabled}
                    indeterminate={indeterminate}
                    loading={loading}
                    size={size}
                />
            </>
        );
    },
};
