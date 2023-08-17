import React from 'react';

import { TextFiledStory } from '../../stories/textField.stories';

import { TextField } from '../../components/textField/textField';

export const DefaultTest: TextFiledStory = {
    args:{
        disabled:false,
        loading:false,
    },
    render: (args) => <TextField {...args} />,
};