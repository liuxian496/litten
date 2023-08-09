import React from 'react';

import { ButtonStory } from "../../stories/button.stories";

import { Mode, Size } from '../../global/enum';
import { Button } from '../../components/button/button';

export const Default: ButtonStory = {
    args: {
        mode: Mode.primary,
        size: Size.medium,
        disabled: false,
        loading: false,
    },
    render: (args) => {
        return (
            <>
                <Button
                    {...args}
                >
                    {'Submit'}
                </Button >
            </>
        );
    }
};