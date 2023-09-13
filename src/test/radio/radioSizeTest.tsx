import React from 'react';

import { RadioStory } from '../../stories/radio.stories';

import { Size } from '../../global/enum';
import { Radio } from '../../components/radio/radio';

export const SizeTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <Radio size={Size.small} />
                <Radio />
                <Radio size={Size.large} />
            </>
        )
    }
};