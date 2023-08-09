import { Meta, StoryObj } from '@storybook/react';

import { Ripple } from '../components/ripple/ripple';

import { Default } from '../test/ripple/default.test';
import { WaveTest } from '../test/ripple/wave.test';

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

const Test: RippleStory = {
    render: () => <></>
  }
  

export {
    Default,
    WaveTest,
}
