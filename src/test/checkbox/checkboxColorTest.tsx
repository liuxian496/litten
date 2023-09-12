import React from 'react';

import { CheckboxStory } from '../../stories/checkbox.stories';

import { Color, Green, Orange, Red } from '../../global/enum';
import { Checkbox } from '../../components/checkbox/checkbox';

export const ColorTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <div style={{ color: Red.dark }}>Danger</div>
                <Checkbox color={Color.danger} />
                <Checkbox color={Color.danger} checked />
                <Checkbox color={Color.danger} indeterminate />
                <Checkbox color={Color.danger} disabled />
                <Checkbox color={Color.danger} disabled checked />
                <Checkbox color={Color.danger} disabled indeterminate />
                <div style={{ color: Green.dark }}>Success</div>
                <Checkbox color={Color.success} />
                <Checkbox color={Color.success} checked />
                <Checkbox color={Color.success} indeterminate />
                <Checkbox color={Color.success} disabled />
                <Checkbox color={Color.success} disabled checked />
                <Checkbox color={Color.success} disabled indeterminate />
                <div style={{ color: Orange.dark }}>Warning</div>
                <Checkbox color={Color.warning} />
                <Checkbox color={Color.warning} checked />
                <Checkbox color={Color.warning} indeterminate />
                <Checkbox color={Color.warning} disabled />
                <Checkbox color={Color.warning} disabled checked />
                <Checkbox color={Color.warning} disabled indeterminate />
            </>
        )
    }
};