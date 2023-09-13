import React from 'react';

import { RadioStory } from '../../stories/radio.stories';

import { Color, Green, Orange, Red } from '../../global/enum';
import { Radio } from '../../components/radio/radio';

export const ColorTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <div style={{ color: Red.dark }}>Danger</div>
                <Radio color={Color.danger} />
                <Radio color={Color.danger} checked />
                <Radio color={Color.danger} disabled />
                <Radio color={Color.danger} disabled checked />
                <div style={{ color: Green.dark }}>Success</div>
                <Radio color={Color.success} />
                <Radio color={Color.success} checked />
                <Radio color={Color.success} disabled />
                <Radio color={Color.success} disabled checked />
                <div style={{ color: Orange.dark }}>Warning</div>
                <Radio color={Color.warning} />
                <Radio color={Color.warning} checked />
                <Radio color={Color.warning} disabled />
                <Radio color={Color.warning} disabled checked />
            </>
        )
    }
};