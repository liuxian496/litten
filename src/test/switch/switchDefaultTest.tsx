import React from "react";

import { SwitchStory } from "../../stories/switch.stories";

import { Switch } from "../../components/switch/switch";
import { Color, Size } from "../../global/enum";

export const DefaultTest: SwitchStory = {
    args: {
        size: Size.medium,
        disabled: false,
        loading: false,
        checked: false,
        color: Color.default
    },
    render: (args) => <Switch {...args} />,
};
