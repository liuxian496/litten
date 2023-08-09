import React from 'react';

import { CheckboxStory } from './checkbox.stories';

import { Size } from '../../global/enum';
import { Checkbox } from '../../components/checkbox/checkbox';

export const SizeTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <Checkbox size={Size.small} />
                <Checkbox />
                <Checkbox size={Size.large} />
            </>
        )
    }
};