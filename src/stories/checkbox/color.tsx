import React from 'react';

import { CheckboxStory } from './checkbox.stories';

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
                <Checkbox color={Color.danger}></Checkbox>
                <Checkbox color={Color.danger} checked></Checkbox>
                <Checkbox color={Color.danger} indeterminate></Checkbox>
                <Checkbox color={Color.danger} disabled></Checkbox>
                <Checkbox color={Color.danger} disabled checked></Checkbox>
                <Checkbox color={Color.danger} disabled indeterminate></Checkbox>
                <div style={{ color: Green.dark }}>Danger</div>
                <Checkbox color={Color.success}></Checkbox>
                <Checkbox color={Color.success} checked></Checkbox>
                <Checkbox color={Color.success} indeterminate></Checkbox>
                <Checkbox color={Color.success} disabled></Checkbox>
                <Checkbox color={Color.success} disabled checked></Checkbox>
                <Checkbox color={Color.success} disabled indeterminate></Checkbox>
                <div style={{ color: Orange.dark }}>Danger</div>
                <Checkbox color={Color.warning}></Checkbox>
                <Checkbox color={Color.warning} checked></Checkbox>
                <Checkbox color={Color.warning} indeterminate></Checkbox>
                <Checkbox color={Color.warning} disabled></Checkbox>
                <Checkbox color={Color.warning} disabled checked></Checkbox>
                <Checkbox color={Color.warning} disabled indeterminate></Checkbox>
            </>
        )
    }
};