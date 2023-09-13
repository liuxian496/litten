import React from 'react';

import { SwitchStory } from '../../stories/switch.stories';

import { Size } from '../../global/enum';
import { Switch } from '../../components/switch/switch';

export const SizeTest: SwitchStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <Switch size={Size.small} />
                <Switch />
                {/* <Switch size={Size.large} /> */}
            </>
        )
    }
};