import { Meta, StoryObj } from '@storybook/react';

import { Ripple } from '../../components/ripple/ripple';

import { Default } from './defaultTest';
import { WaveTest } from './waveTest';

export default {
    title: 'Example/Ripple',
    component: Ripple,
    argTypes: {
        prefixCls: {
            control: false,
        },
        color: {
            control: false,
        }
    },

} as Meta<typeof Ripple>;

export type RippleStory = StoryObj<typeof Ripple>;

export {
    Default,
    WaveTest,
}
