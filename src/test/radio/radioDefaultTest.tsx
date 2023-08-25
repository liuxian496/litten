import React from 'react';

import { RadioStory } from '../../stories/radio.stories';

import { Color, Size } from '../../global/enum';
import { Radio } from '../../components/radio/radio';


export const DefaultTest: RadioStory = {
    args: {
        size: Size.medium,
        disabled: false,
        loading: false,
        checked: false,
        color: Color.default
    },
    render: (args) => {
        return (
            <>
                <Radio {...args} name='fruit' />
            </>
        )
    }
};