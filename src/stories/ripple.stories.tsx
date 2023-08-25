import { Meta, StoryObj } from '@storybook/react';

import { Ripple } from '../components/ripple/ripple';

import { DefaultTest } from '../test/ripple/rippleDefaultTest';
import { WaveTest } from '../test/ripple/waveTest';

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

export const Default = DefaultTest;

export const Wave = WaveTest;
