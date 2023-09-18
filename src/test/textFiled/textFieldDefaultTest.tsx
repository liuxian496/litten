import React from "react";

import { TextFiledStory } from "../../stories/textField.stories";

import { TextField } from "../../components/textField/textField";
import { TextFieldType } from "../../global/enum";

export const DefaultTest: TextFiledStory = {
    args: {
        disabled: false,
        loading: false,
        type: TextFieldType.text,
    },
    render: (args) => <TextField {...args} />,
};
