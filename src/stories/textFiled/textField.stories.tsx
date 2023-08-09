import { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../../components/textField/textField';

import { Default } from './defaultTest';
import { ValueTest } from './valueTest';

export default {
  title: 'Example/TextField',
  component: TextField,
  argTypes: {
    prefixCls: {
      control: false,
    },
    color: {
      control: false,
    }
  },

} as Meta<typeof TextField>;

export type TextFiledStory = StoryObj<typeof TextField>;

export {
  Default,
  ValueTest,
}
