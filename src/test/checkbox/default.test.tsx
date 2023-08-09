import React from 'react';


import { CheckboxStory } from '../../stories/checkbox.stories';

import { Size } from '../../global/enum';
import { Checkbox } from '../../components/checkbox/checkbox';

export const Default: CheckboxStory = {
    args: {
        size: Size.medium,
        disabled: false,
        indeterminate: false,
        checked: false,
        loading: false,
    },
    render: (args) => {
        return (
            <>
                <Checkbox {...args} />
            </>
        );
    }
};