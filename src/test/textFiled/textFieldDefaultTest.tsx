import React from "react";

import { TextFieldType } from "litten-hooks/dist/enum";

import { TextFiledStory } from "../../stories/textField.stories";

import { TextField } from "../../components/textField/textField";

export const DefaultTest: TextFiledStory = {
    args: {
        disabled: false,
        loading: false,
        type: TextFieldType.text,
    },
    render: (args) => <TextField {...args} />,
};
