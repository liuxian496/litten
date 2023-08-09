import { Meta, StoryObj } from '@storybook/react';

import { Summary } from '../components/summary/summary';

import { Default } from '../test/summary/default.test';


export default {
    title: 'Example/Summary',
    component: Summary,
    argTypes: {
        prefixCls: {
            control: false,
        },
        color: {
            control: false,
        }
    },

} as Meta<typeof Summary>;

export type SummaryStory = StoryObj<typeof Summary>;

export { 
    Default 
}
