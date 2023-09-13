import React from 'react';

import { SwitchStory } from '../../stories/switch.stories';

import { Color, Green, Orange, Red } from '../../global/enum';
import { Switch } from '../../components/switch/switch';

export const ColorTest: SwitchStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <div style={{ color: Red.dark }}>Danger</div>
                <Switch color={Color.danger} />
                <Switch color={Color.danger} checked />
                <Switch color={Color.danger} disabled />
                <Switch color={Color.danger} disabled checked />
                <div style={{ color: Green.dark }}>Success</div>
                <Switch color={Color.success} />
                <Switch color={Color.success} checked />
                <Switch color={Color.success} disabled />
                <Switch color={Color.success} disabled checked />
                <div style={{ color: Orange.dark }}>Warning</div>
                <Switch color={Color.warning} />
                <Switch color={Color.warning} checked />
                <Switch color={Color.warning} disabled />
                <Switch color={Color.warning} disabled checked />
            </>
        )
    }
};